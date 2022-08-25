const express = require('express');
const cors = require('cors');

const cats = require('./cats.json');

const app = express();
app.use(cors());

app.get('/cats', (req, res) => {
  res.json(cats);
});

app.listen(4000, () => {
  console.log('listening on port 4000')
});