'use strict';

var PageView = require('../framework/page');

var TodoCollection = require('../collections/todos'),
  TodoView = require('../views/todo');

var toDoScreen = PageView.extend({

  id: 'toDo',

  template: require('../../templates/pages/toDo.hbs'),

  buttonEvents: {
    right: 'goToHomePage',
    face: 'screenClickExample',
    left: 'back'
  },

  initialize: function() {
    var self = this;

    this.todoCollection = new TodoCollection();
    this.listenTo(this.todoCollection, 'change', this.render);

    self.seedtodo();
  },

  // TODO use jquery to load a JSON file async test?
  seedtodo: function() {
    this.todoCollection.push([
      {T_TASK: 'Clean floor', T_STATUS: '1'},
      {T_TASK: 'Something important', T_STATUS: '2'},
      {T_TASK: 'Something not so important', T_STATUS: '3'}
    ]);
  },

  screenClickExample: function() {
    this.$el.html('<div>Oh noes!</div>');
  },

  goToHomePage: function() {
    global.App.navigate('');
  },

  render: function() {

    this.$el.html(this.template());

    var todoHTML = document.createDocumentFragment();

    this.todoCollection.each(function(todo) {
      $(todoHTML).append(this.createtodoHTML(todo));
    }, this);

    this.$el.append(todoHTML);

    return this;
  },

  createtodoHTML: function(todo) {
      var view = new TodoView({
        model: todo
      });
      return view.render().el;
    }

}
);

module.exports = toDoScreen;
