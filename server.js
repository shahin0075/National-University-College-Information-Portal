const corsAnywhere = require('cors-anywhere');
const express = require('express');
const path = require('path');

const proxy = corsAnywhere.createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [],
  redirectSameOrigin: true
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Custom proxy endpoint
app.get('/api/college/:code', (req, res) => {
  req.url = `/nu-app/college/profile/${req.params.code}`;
  proxy.emit('request', req, res, {
    target: 'http://103.113.200.68',
    changeOrigin: true,
    headers: {
      'Referer': 'http://103.113.200.68/',
      'Origin': 'http://103.113.200.68'
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});