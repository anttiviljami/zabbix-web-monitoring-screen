var express = require('express');
var router = express.Router();

var _ = require('lodash');

var zabbix = require('zabbix-node');

var conf = {
  'url': process.env.ZABBIX_URL,
  'user': process.env.ZABBIX_USER,
  'password': process.env.ZABBIX_PASS,
  'host': process.env.ZABBIX_HOST,
}

router.get('/', function(req, res) {
  res.send('Nothing here');
});

router.get('/version', function(req, res) {
  var client = new zabbix(conf.url + '/api_jsonrpc.php', conf.user, conf.password);

  // This method can be called without login
  client.getApiVersion(function(error, resp, body) {
    res.send(body);
  });
});

router.get('/scenarios', function(req, res) {
  var client = new zabbix(conf.url + '/api_jsonrpc.php', conf.user, conf.password);

  client.login(function(error, resp, body) {
    client.call('httptest.get', {'hostids': conf.host, 'monitored': true, 'sortfield': 'name'}, function(error, resp, body) {
      res.send(body);
    });
  });
});

router.get('/triggers/:search', function(req, res) {
  var client = new zabbix(conf.url + '/api_jsonrpc.php', conf.user, conf.password);

  client.login(function(error, resp, body) {
    client.call('trigger.get', {'hostids': conf.host, 'search': {'description': req.params.search}, 'selectLastEvent': true}, function(error, resp, body) {
      res.send(body);
    });
  });
});

module.exports = router;
