// assetController.test.ts
import { Application } from 'express';
import request from 'supertest';
import { getDbClient } from '../getDbClient';
import AssetRouter from '../src/modules/assets/AssetRouter';
import { AssetModel } from '../src/modules/assets/AssetModel';
import express from 'express';
import bodyParser from 'body-parser';

describe('AssetController', () => {
  let app: Application;

  beforeAll(async () => {
    const client = getDbClient();
    const assetModel = new AssetModel(client);

    app = express();
    app.use(bodyParser.json());
    app.use('/assets', AssetRouter);
  });

  test('POST /assets', async () => {
    const asset = {
      name: 'Asset Name',
      type: 'picture',
      content: 'Base64EncodedContent',
    };

    const response = await request(app).post('/assets').send(asset);

    expect(response.status).toBe(201);
    expect(response.body.uuid).toBeDefined();
  });
});
