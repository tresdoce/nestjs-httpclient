import https from 'https';

export const AXIOS_INSTANCE_TOKEN = 'AXIOS_INSTANCE_TOKEN';
export const HTTP_MODULE_ID = 'HTTP_MODULE_ID';
export const HTTP_MODULE_OPTIONS = 'HTTP_MODULE_OPTIONS';

export const headers = {
  'Content-Type': 'application/json',
  Accept: `application/vnd.iman.v1+json, application/json, text/plain, */*`,
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  Pragma: 'no-cache',
};

export const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  requestCert: false,
});
