const bcrypt = require('bcrypt');

async function run() {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash('password', salt)
  const result = await bcrypt.compare('password', hashed)
  console.log(salt)
  console.log(hashed)
  console.log(result)
}

run()
