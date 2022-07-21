const bcrypt = require('bcrypt');

const hash = async (password) => {
  const saltRounds = 10
  const hash = bcrypt.hash(password, saltRounds);
  return hash
}

const decrypt = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid
}

module.exports = { hash, decrypt };