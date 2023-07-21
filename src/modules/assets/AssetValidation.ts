import Joi from 'joi';
export default  {
  createAsset: Joi.object()
    .keys({
      type: Joi.string().valid('picture', 'video').required(),
      name: Joi.string().required(),
      content: Joi.binary().required()
    }),
};
