'use strict';

var Router = require('./framework/router.js'),
  HomePage = require('./pages/homePage'),
  ContactsPage = require('./pages/contactsPage'),
  ToDoPage = require('./pages/toDoPage'),
  homePage = new HomePage(),
  contactsPage = new ContactsPage(),
  toDoPage = new ToDoPage();

var AppRouter = Router.extend({

  routes: {
    '': 'home',
    contacts: 'contacts',
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
   }

});

module.exports = AppRouter;
