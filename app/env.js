import * as pkg from '../package.json';

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: process.env.APP_NAME,
    version: pkg.version,
    description: pkg.description,
    host: process.env.APP_HOST,
    schema: process.env.APP_SCHEMA,
    routePrefix: process.env.APP_ROUTE_PREFIX,
    port: process.env.APP_PORT,
  },
  farmhub: {
    productService: process.env.FARMHUB_PRODUCT_SERVICE,
    userService: process.env.FARMHUB_USER_SERVICE,
    pushLogService: process.env.FARMHUB_PUSH_LOG_SERVICE,
    identityService: process.env.FARMHUB_IDENTITY_SERVICE,
    farmService: process.env.FARMHUB_FARM_SERVICE,
    uploadService: process.env.FARMHUB_UPLOAD_SERVICE,
    webApp: process.env.FARMHUB_WEB_APP,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
};
