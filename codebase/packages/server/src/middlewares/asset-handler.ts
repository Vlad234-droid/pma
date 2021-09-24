import { Handler } from 'express';
import { promises as fs } from 'fs';

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
  ({ pathToFile, config }: AssetHandlerParams): Handler =>
  async (_, res) => {
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
    res.send(preloadedTemplate);
  };
