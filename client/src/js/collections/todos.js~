var Todo = require('../models/todo.js');
var Config = require('../config/config.js');

var Todos = Backbone.Firebase.Collection.extend({
  model: Todo,
  url: Config.firebaseUrl + '/Todos'
});

module.exports = Todos;
