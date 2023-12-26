const crypto = require('crypto');

module.exports = function encryptMessage(message) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(message, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
return{
  encryptedMessage: encrypted,
  key: key.toString('hex'),
  iv: iv.toString('hex'),
}
};