import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';
export interface Asset {
  uuid: string;
  name: string;
  type: 'picture' | 'video';
  content: string;
}

export class AssetModel {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
    this.dbClient.connect();
  }

  async createAsset(asset: Asset): Promise<string> {
    const { name, type, content } = asset;
    const uuid = uuidv4();

    const query = `
      INSERT INTO assets(uuid, name, type, content) 
      VALUES($1, $2, $3, $4)
    `;
    const values = [uuid, name, type, content];

    try {
      await this.dbClient.query(query, values);
      return uuid;
    } catch (err) {
      console.error(err);
      throw new Error("Error creating asset");
    }
  }

  async getAssetById(uuid: string): Promise<Asset | null> {
    const query = `
      SELECT * FROM assets WHERE uuid = $1
    `;
    const values = [uuid];

    try {
      const res = await this.dbClient.query(query, values);
      return res.rows[0] || null;
    } catch (err) {
      console.error(err);
      throw new Error("Error retrieving asset");
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    const query = `
    SELECT * FROM assets
  `;

    try {
      const res = await this.dbClient.query(query);
      return res.rows;
    } catch (err) {
      console.error(err);
      throw new Error("Error retrieving assets");
    }
  }

  async deleteAssetById(uuid: string): Promise<void> {
    const query = `
    DELETE FROM assets WHERE uuid = $1
  `;
    const values = [uuid];

    try {
      await this.dbClient.query(query, values);
    } catch (err) {
      console.error(err);
      throw new Error("Error deleting asset");
    }
  }
}
