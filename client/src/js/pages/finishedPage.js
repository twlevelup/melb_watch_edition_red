'use strict';

var PageView = require('../framework/page');

var ContactsCollection = require('../collections/contacts'),
  ContactView = require('../views/contact');

var FinishedView = PageView.extend({

  id: 'finished',

  template: require('../../templates/pages/finished.hbs'),

  buttonEvents: {
    right: 'goToHomePage',
    face: 'screenClickExample',
    left: 'back'
  },

  initialize: function() {
    var self = this;

    this.contactsCollection = new ContactsCollection();
    this.listenTo(this.contactsCollection, 'change', this.render);

    // self.seedContacts();
  },

  // TODO use jquery to load a JSON file async test?
  seedContacts: function() {
    this.contactsCollection.push([
      {T_TASK: 'Clean floor', T_STATUS: 'Done'},
      {T_TASK: 'Something important', T_STATUS: 'Not done'},
      {T_TASK: 'Something not so important', T_STATUS: 'Not one'}
    ]);
  },

  screenClickExample: function() {
    // this.$el.html('<div>Oh noes!</div>');
  },

  goToHomePage: function() {
    global.App.navigate('');
  },

  render: function() {

    this.$el.html(this.template());

    var contactsHTML = document.createDocumentFragment();

    this.contactsCollection.each(function(contact) {
      $(contactsHTML).append(this.createContactHTML(contact));
    }, this);

    this.$el.append(contactsHTML);

    return this;
  },

  createContactHTML: function(contact) {
      var view = new ContactView({
        model: contact
      });
      return view.render().el;
    }

}
);

module.exports = FinishedView;
