import { Client, QueryResult } from "pg";
import { Asset, AssetModel } from '../src/modules/assets/AssetModel';
import { v4 as uuidv4 } from 'uuid';
import mocked = jest.mocked;

describe('AssetModel', () => {
  let model: AssetModel;
  let dbClientMock: jest.Mocked<Client>;

  beforeEach(() => {
    dbClientMock = {
      connect: jest.fn(),
      end: jest.fn(),
      query: jest.fn(),  // add other methods that you will use from the Client object
      // ...
    } as any;
    model = new AssetModel(dbClientMock);
  });

  it('should create an asset successfully', async () => {
    const mockQueryResult: QueryResult = {
      rowCount: 1,
      rows: [],
      command: 'INSERT',
      oid: 0,
      fields: [],
    };

    // @ts-ignore
    mocked(dbClientMock.query).mockResolvedValueOnce(mockQueryResult);
    const asset: Asset = {
      uuid: uuidv4(),
      name: 'Asset Name',
      type: 'picture',
      content: 'Content'
    };

    // Call the method under test
    const result = await model.createAsset(asset);

    // Check that the method returned the expected result
    expect(result).toBeDefined();

    // Check that the method called the client with the right parameters
    expect(dbClientMock.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO assets'),
      expect.arrayContaining([asset.name, asset.type, asset.content])
    );
  });
});
