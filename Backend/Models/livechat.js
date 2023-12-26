const mongoose = require('mongoose');
const livechatSchema = new mongoose.Schema( 
    {
        newQuestion: {
            type: Array,
            default: [],
            required: false,
          },
          answer: {
            type: Array,
            default: [],
            required: false,
          },
        
        
      },
      // schemaOptions
      {
        strict: true,
        timestamps: true,
      }
    );

 module.exports = mongoose.model('livechat', livechatSchema);
 module.exports.Schema = livechatSchema;   