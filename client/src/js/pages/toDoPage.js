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
  /* Pushes sample tasks which gets  pushed to firebase.
     Need a way to branch sub tasks.
     Need to load existing tasks from firebase by pulling JSON objects */
  seedtodo: function() {
    this.todoCollection.push([
      {T_TASK_ID:'1',T_TASK: 'Fill the box-flattener', T_STATUS: '0',T_TASK_TYPE:'SMALL_TASK'},
      {T_TASK_ID:'2', T_TASK: 'Fill the delivery trucks', T_STATUS: '0',T_TASK_TYPE:'SMALL_TASK'},
      {T_TASK_ID:'3', T_TASK: 'Calibrate the back office', T_STATUS: '0',T_TASK_TYPE:'SMALL_TASK'},
      {T_TASK_ID:'4', T_TASK: 'Empty the floors', T_STATUS: '0',T_TASK_TYPE:'BIG_TASK'},
      {T_TASK_ID:'5', T_TASK: ' + very large task', T_STATUS: '0',T_TASK_TYPE:'BIG_TASK'}/*,
      {T_TASK: 'Check the box-flattener', T_STATUS: '0'},
      {T_TASK: 'Calibrate the box-flattener', T_STATUS: '0'},
      {T_TASK: 'Move the floors', T_STATUS: '0'},
      {T_TASK: 'Service the box-flattener', T_STATUS: '0'},
      {T_TASK: 'Calibrate the printers', T_STATUS: '0'},
      {T_TASK: ' + Black and White Printer', T_STATUS: '0'},
      {T_TASK: ' + Colour Printer', T_STATUS: '0'},
      {T_TASK: ' + Laser Printer', T_STATUS: '0'},
      {T_TASK: ' + Fax Machine', T_STATUS: '0'},
      {T_TASK: 'Service the floors', T_STATUS: '0'},
      {T_TASK: 'Fill the back office', T_STATUS: '0'},
      {T_TASK: 'Calibrate the delivery trucks', T_STATUS: '0'},
      {T_TASK: 'Move the floors', T_STATUS: '0'},
      {T_TASK: 'Empty the conveyor belts', T_STATUS: '0'},
      {T_TASK: 'Clean the delivery Trucks', T_STATUS: '0'},
      {T_TASK: 'Empty the printers', T_STATUS: '0'},
      {T_TASK: 'Clean the floors', T_STATUS: '0'},
      {T_TASK: ' + Very large task', T_STATUS: '0'}*/
    ]);
  },

  /* Tap into the watch screen event goes here
    screenClickExample: function() {
      this.$el.html('<div>Oh noes!</div>');
    },
*/


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
