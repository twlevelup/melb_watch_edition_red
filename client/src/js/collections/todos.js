var Todo = require('../models/todo.js');
var Config = require('../config/config.js');

var Todos = Backbone.Firebase.Collection.extend({
  model: Todo,
  url: Config.firebaseUrl + '/Todos'
});

/*
var IdNum = Backbone.Firebase.Collection.extend({
  model: IdNum,
  url: Config.firebaseUrl + '/IdNum'
});
*/
module.exports = Todos;
