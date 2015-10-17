'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  ContactsPage = require('./pages/contactsPage'),
  FinishedPage = require('./pages/finishedPage'),
  ToDoPage = require('./pages/toDoPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  finishedPage = new FinishedPage(),
  toDoPage = new ToDoPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
    finished_tasks: 'finished_tasks',
    toDo: 'toDo'
  },

  home: function() {
    this.renderView(homePage);
  },

  contacts: function() {
    this.renderView(contactsPage);
  },

   toDo: function(){
     this.renderView(toDoPage);
 },

   finished_tasks: function(){
       this.renderView(finishedPage);
   }

});

module.exports = AppRouter;
