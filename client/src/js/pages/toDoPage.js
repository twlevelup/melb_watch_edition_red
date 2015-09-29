'use strict';

var PageView = require('../framework/page');

var toDoScreen = PageView.extend({

  id: 'toDo',

  template: require('../../templates/pages/toDo.hbs'),

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});

module.exports = toDoScreen;
