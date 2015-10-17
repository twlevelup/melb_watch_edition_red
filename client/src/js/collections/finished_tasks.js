var Finished_task = require('../models/finished_task.js');
var Config = require('../config/config.js');

var Finished_tasks = Backbone.Firebase.Collection.extend({
  model: Finished_task,
  url: Config.firebaseUrl + '/Todos'
});


/* Change */
var IdNum = Backbone.Firebase.Collection.extend({
  model: IdNum,
  url: Config.firebaseUrl + '/IdNum'
});

module.exports = Finished_tasks;
