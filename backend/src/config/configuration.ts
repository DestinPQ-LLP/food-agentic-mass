export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',

  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    name: process.env.DATABASE_NAME ?? 'food_agentic_mass_db',
    user: process.env.DATABASE_USER ?? 'food_agentic_mass_user',
    pass: process.env.DATABASE_PASS ?? '',
    ssl: process.env.DATABASE_SSL === 'true',
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? 'change_me_dev_secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
  },

  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL ?? 'https://graph.facebook.com/v19.0',
    token: process.env.WHATSAPP_TOKEN ?? '',
    phoneId: process.env.WHATSAPP_PHONE_ID ?? '',
  },

  azure: {
    storageConnStr: process.env.AZURE_STORAGE_CONN_STR ?? '',
    storageAccount: process.env.AZURE_STORAGE_ACCOUNT ?? 'foodagenticmasscdn',
    // Classic Azure CDN was retired for new profiles in 2025; we use
    // Azure Front Door Standard. AZURE_AFD_HOST includes the unique hash
    // produced at provision time (e.g. food-agentic-mass-xxxx.z01.azurefd.net).
    afdProfile: process.env.AZURE_AFD_PROFILE ?? 'food-agentic-mass-cdn-profile',
    afdEndpoint: process.env.AZURE_AFD_ENDPOINT ?? 'food-agentic-mass',
    afdHost: process.env.AZURE_AFD_HOST ?? '',
    // Composite URL: prefer the explicit AZURE_CDN_ENDPOINT (set by setup
    // script) and fall back to building one from AZURE_AFD_HOST.
    cdnEndpoint:
      process.env.AZURE_CDN_ENDPOINT ??
      (process.env.AZURE_AFD_HOST ? `https://${process.env.AZURE_AFD_HOST}` : ''),
    resourceGroup: process.env.AZURE_RESOURCE_GROUP ?? 'food-agentic-mass-rg',
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? '',
    endpoint: process.env.AZURE_OPENAI_ENDPOINT ?? '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-4',
  },
});
