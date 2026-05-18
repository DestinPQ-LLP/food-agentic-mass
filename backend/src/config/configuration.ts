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
    cdnEndpoint: process.env.AZURE_CDN_ENDPOINT ?? 'https://food-agentic-mass.azureedge.net',
    cdnProfile: process.env.AZURE_CDN_PROFILE_NAME ?? 'food-agentic-mass-cdn-profile',
    cdnEndpointName: process.env.AZURE_CDN_ENDPOINT_NAME ?? 'food-agentic-mass',
    resourceGroup: process.env.AZURE_RESOURCE_GROUP ?? 'food-agentic-mass-rg',
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? '',
    endpoint: process.env.AZURE_OPENAI_ENDPOINT ?? '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-4',
  },
});
