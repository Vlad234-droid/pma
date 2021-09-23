import { PUBLIC_URL } from 'config/constants';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: PUBLIC_URL });

export type History = typeof history;

export default history;
