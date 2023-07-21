import { Request, Response } from "express";
import { Asset, AssetModel } from "./AssetModel";
import assetRouter from "./AssetRouter";
export default class AssetController {
  private assetModel: AssetModel;

  constructor(assetModel: AssetModel) {
    this.assetModel = assetModel;
  }
  createAsset = async (req: Request, res: Response) => {
    const assetData: Asset = req.body;

    try {
      const uuid = await this.assetModel.createAsset(assetData);
      res.status(201).json({ uuid });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error creating asset", error: err });
    }
  }

  getAssetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const asset = await this.assetModel.getAssetById(id);

      if (asset) {
        res.status(200).json(asset);
      } else {
        res.status(404).json({ message: "Asset not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error retrieving asset", error: err });
    }
  }

  getAllAssets = async (req: Request, res: Response) => {
    try {
      const assets = await this.assetModel.getAllAssets();

      res.status(200).json(assets);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving assets", error: err });
    }
  }

  deleteAssetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await this.assetModel.deleteAssetById(id);

      res.status(200).json({ message: "Asset deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting asset", error: err });
    }
  }
}
