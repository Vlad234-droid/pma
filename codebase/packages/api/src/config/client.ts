import { createHttpClient } from '../utils';

const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

let baseURL = `${API_URL}/`;
if (API_VERSION) {
  baseURL += `${API_VERSION}/`;
}

export default createHttpClient(baseURL);
