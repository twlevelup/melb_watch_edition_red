'use strict';

var ToDoPage = require('../../src/js/pages/toDopage'),
   Router = require('../../src/js/router'),
   App = require('../../src/js/app');

global.App = App;

describe('The To Do Page', function() {
  var toDoPage;

  beforeEach(function() {
    toDoPage = new ToDoPage();
  });

  describe('rendering', function() {

    it('should produce the correct HTML', function() {
      toDoPage.render();
      expect(toDoPage.$el).toContainText('To Do\'s');
    });
  });

});
