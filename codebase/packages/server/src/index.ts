import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// utils
import { getPackageDistFolder } from './utils/package';
import { exit } from 'process';

const NODE_PORT = process.env.NODE_PORT || 8000;
const API_SERVER_URL = process.env.API_SERVER_URL;

if (!API_SERVER_URL) {
  console.error(`Required property is not set: API_SERVER_URL. Server halted.`);
  exit(-1);
}

const proxy = httpProxy.createProxyServer({});
const apiServer = (req, res) => proxy.web(req, res, { target: API_SERVER_URL });

const app = express();

const clientDistFolder = getPackageDistFolder('@pma/client');
const htmlFilePath = path.join(clientDistFolder, 'index.html');

app.use(cookieParser());
app.use(cors());
app.use(express.static(clientDistFolder, { index: false }));
app.use(express.static('public'));

app.use('/api', apiServer);

app.use('/', (_, res) => {
  res.sendFile(htmlFilePath);
});

app.use('/_status', (_, res) => res.sendStatus(200));

app.listen(NODE_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${NODE_PORT}`);
});
