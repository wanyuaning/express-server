var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
res.send('server router test');
});

module.exports = router;
