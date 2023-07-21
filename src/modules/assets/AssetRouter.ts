import { NextFunction, Request, Response, Router } from "express";
import AssetController from './AssetController'
import { getDbClient } from '../../../getDbClient'
import { AssetModel } from "./AssetModel";
import AssetValidationSchema from "./AssetValidation";
const router = Router();

const assetController = new AssetController(new AssetModel(getDbClient()))

// @ts-ignore
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error } = AssetValidationSchema.createAsset.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}, assetController.createAsset)
router.get('/:id', assetController.getAssetById)
router.get('/', assetController.getAllAssets);
router.delete('/:id', assetController.deleteAssetById);


export default router;
