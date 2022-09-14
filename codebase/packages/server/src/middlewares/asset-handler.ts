import { ProcessConfig } from 'config';
import { Handler } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

type AssetHandlerParams = {
  pathToFile: string;
  config: Window['__MY_WORK_CONFIG__'];
};

export const mfModuleAssetHandler =
  ({ pathToFile, config }: AssetHandlerParams): Handler =>
  async (_, res) => {
    const originalCode = await fs.readFile(pathToFile);
    const configCode = Buffer.from(`window["__MY_WORK_CONFIG__"] = ${JSON.stringify(config)};`);

    res.contentType('js');
    res.send(Buffer.concat([configCode, originalCode]));
  };

export const standaloneIndexAssetHandler =
  ({ applicationContextPath }: ProcessConfig, { pathToFile, config }: AssetHandlerParams): Handler =>
  async (req, res) => {
    if (!req.originalUrl.startsWith(path.join(applicationContextPath(), 'camunda'))) {
      const templateCode = await fs.readFile(pathToFile);

      const preloadedStateCode = Buffer.from(`
          <script>window["__MY_WORK_CONFIG__"] = ${JSON.stringify(config)}</script>
          `);

      const bodyIndex = templateCode.indexOf('</body>');
      const preloadedTemplate = Buffer.concat([
        templateCode.slice(0, bodyIndex),
        preloadedStateCode,
        templateCode.slice(bodyIndex),
      ]);

      res.contentType('html');
      res.setHeader('Cache-Control', 'no-store');
      res.send(preloadedTemplate);
    }
  };
