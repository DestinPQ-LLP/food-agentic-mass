import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import type { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Placeholder login: replace with real user lookup + password verification
   * (bcrypt) once the user entity / table is added. For now any valid-shaped
   * request returns a signed token so the rest of the API surface is testable.
   */
  async login(dto: LoginDto) {
    if (!dto.email && !dto.phone) {
      throw new UnauthorizedException('Provide email or phone');
    }

    const payload: JwtPayload = {
      sub: 'demo-user-id',
      email: dto.email,
      phone: dto.phone,
      roles: [Role.OWNER, Role.MANAGER, Role.ADMIN],
    };

    return {
      accessToken: await this.jwt.signAsync(payload),
      user: payload,
    };
  }

  async refresh(token: string) {
    try {
      const decoded = await this.jwt.verifyAsync<JwtPayload>(token);
      const { iat: _iat, exp: _exp, ...rest } = decoded as any;
      return { accessToken: await this.jwt.signAsync(rest) };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
