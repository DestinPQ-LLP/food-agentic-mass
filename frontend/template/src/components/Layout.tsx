import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
}

export default function Layout({ title, subtitle, badge, children }: Props) {
  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>{title}</h1>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
        {badge && <span style={styles.badge}>{badge}</span>}
      </header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>Food Agentic Mass · © DestinPQ LLP</footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    color: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f8fafc',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 28px',
    borderBottom: '1px solid #e2e8f0',
    background: 'white',
  },
  h1: { fontSize: 22, margin: 0, color: '#1e3a8a', fontWeight: 700 },
  subtitle: { margin: '4px 0 0 0', color: '#475569', fontSize: 14 },
  badge: {
    background: '#dbeafe',
    color: '#1e3a8a',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  main: { padding: 28, flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto' },
  footer: {
    padding: 16,
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
    background: 'white',
  },
};
