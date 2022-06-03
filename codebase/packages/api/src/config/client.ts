import { createHttpClient } from '../utils';

const API_URL = process.env.REACT_APP_API_URL;

export default createHttpClient(API_URL);
