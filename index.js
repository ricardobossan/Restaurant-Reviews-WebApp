const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, '')))
  .get('/', (req, res) => res.render('index'))
  .get('/data/restaurants', (req, res) => res.render('data/restaurants'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))