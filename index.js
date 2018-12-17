const express = require('express')
const path = require('path')
const PORT = process.env.PORT
console.log(PORT)

express()
  .use(express.static(path.join(__dirname, '')))
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))