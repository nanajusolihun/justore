import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const URL_DB = process.env.URL_DB;
const API_KEY = process.env.API_KEY;
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const PROJECT_ID = process.env.PROJECT_ID;
const STROAGE_BUCKET = process.env.STROAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
const APP_ID = process.env.APP_ID;
const MEASUREMENT_ID = process.env.MEASUREMENT_ID;
const YOUR_FIREBASE_STROAGE_URL = process.env.YOUR_FIREBASE_STROAGE_URL;
const PUBLISH_KEY = process.env.PUBLISH_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

export {
  PORT,
  URL_DB,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STROAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  YOUR_FIREBASE_STROAGE_URL,
  PUBLISH_KEY,
  SECRET_KEY,
};