import { createHttpClient } from '../utils';

const MY_INBOX_API_PATH = process.env.REACT_APP_MY_INBOX_API_PATH;

export default createHttpClient(MY_INBOX_API_PATH);
