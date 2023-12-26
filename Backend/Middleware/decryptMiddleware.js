const crypto = require('crypto');
module.exports=function decryptMessage(encryptedMessage, key, iv) {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  };