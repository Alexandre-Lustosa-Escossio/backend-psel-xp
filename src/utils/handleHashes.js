const bcrypt = require('bcryptjs');

const hash = async (password) => {
  const saltRounds = 10
  const hash = hash(password, saltRounds);
  return hash
}

const decrypt = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid
}

module.exports = { hash, decrypt };