'use strict';

var PageView = require('../framework/page');

var homeScreen = PageView.extend({

  id: 'home',

  template: require('../../templates/pages/home.hbs'),

  buttonEvents: {
    // right: 'goToContacts',
    right: 'goToToDoList',
    top: 'scrollUp',
    bottom: 'scrollDown'
  },

  /*
  goToContacts: function() {
    global.App.navigate('contacts');
  },
  */

  goToToDoList: function() {
    global.App.navigate('toDo');
  },

  scrollUp: function() {
    $('#watch-face').animate({scrollTop: '-=70px'});
  },

  scrollDown: function() {
    $('#watch-face').animate({scrollTop: '+=70px'});
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});

module.exports = homeScreen;
