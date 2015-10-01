'use strict';

var TodoView = Backbone.View.extend({

  tagName: 'li',

  template: require('../../templates/views/toDo.hbs'),

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});

module.exports = TodoView;
