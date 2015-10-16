'use strict';
var TodoCollection = require('../collections/todos');

var NotificationsPanel = Backbone.View.extend({

  el: '#notification-panel',

  template: require('../../templates/framework/notificationPanel.hbs'),
  notificationsArray: [],

  ACTION_SELECT_SELECTOR: 'select[name="notification_action"]',
  MESSAGE_TEXTAREA_SELECTOR: 'textarea[name="notification_message"]',

  /**** Edited *****/

  ID_NUMBER_TEXTAREA_SELECTOR:'textarea[name="id_number_message"]',
  TASK_DESCRIPTION_TEXTAREA_SELECTOR: 'textarea[name="task_discription_message"]',

  /**** Edited *****/

  SEND_BUTTON_SELECTOR: '#button-sendNotification',

  NOTIFICATION_POPUP_SELECTOR: '#notification_popup',
  NOTIFICATION_MESSAGE_SELECTOR: '#notification_message_display',

  configureNotifications: function(availableNotificationTypes) {
    this.notificationsArray = availableNotificationTypes;

    _.bindAll(this, 'render');
    this.render();

    this._configureListeners();
    this._populateNotificationSelectOptions();
  },

  _configureListeners: function() {
    this.$(this.SEND_BUTTON_SELECTOR).on('click', _.bind(this._sendNotification, this));
    this.$(this.ACTION_SELECT_SELECTOR).on('change', _.bind(this._populateDefaultMessageText, this));
  },

  _populateNotificationSelectOptions: function() {
    var option = '';

    _.each(this.notificationsArray, function(elem) {
      option += '<option>' + elem.name + '</option>';
    });

    this.$(this.ACTION_SELECT_SELECTOR).append(option);
    this.$(this.ACTION_SELECT_SELECTOR).prop('selectedIndex', -1);
  },

  _populateDefaultMessageText: function() {
    var selectedValue = this.$(this.ACTION_SELECT_SELECTOR).val(),
      selectedNotificationType = _.findWhere(this.notificationsArray, {name: selectedValue});

    this.$(this.MESSAGE_TEXTAREA_SELECTOR).val('');
    if (selectedNotificationType && selectedNotificationType.defaultMessage) {
      this.$(this.MESSAGE_TEXTAREA_SELECTOR).val(selectedNotificationType.defaultMessage);
    }
  },

  _sendNotification: function(event) {
      /*This Gets the drop down box*/
    var notificationAction = this.$(this.ACTION_SELECT_SELECTOR).val(),
      /*This Gets the text box*/
      //notificationMessage = this.$(this.MESSAGE_TEXTAREA_SELECTOR).val(),
      selectedNotificationType = _.findWhere(this.notificationsArray, {name: notificationAction}),

      taskId = this.$(this.ID_NUMBER_TEXTAREA_SELECTOR).val(),
      task = this.$(this.TASK_DESCRIPTION_TEXTAREA_SELECTOR).val();

      /****** Edited *******/

      /* This is where we should send the thing to the database */
      var taskType, notificationMessage;
      if(notificationAction === "Normal Task"){
          taskType = "SMALL_TASK";
      }else {
          taskType = "BIG_TASK";
      }

      this.todoCollection = new TodoCollection();

      this.seedtodo(taskId, task, taskType);

      /****** Edited *******/

      notificationMessage = taskId + taskType+ task;

    this.showNotification(selectedNotificationType, notificationMessage);
  },

  seedtodo: function(taskId, task, taskType) {

    this.todoCollection.push([
        {T_TASK_ID:taskId,T_TASK: task, T_STATUS: '0',T_TASK_TYPE:taskType}
    ]);
  },

  showNotification: function(selectedNotificationType, notificationMessage) {
    if (!selectedNotificationType) {
      return;
    }
    /*Popup Box*/
    $(this.NOTIFICATION_POPUP_SELECTOR).show();
    /*The message in the box*/
    $(this.NOTIFICATION_MESSAGE_SELECTOR).text(notificationMessage);

    global.App.router.currentView.stopListening();
    this._remapButtons(selectedNotificationType);
  },

  _remapButtons: function(selectedNotificationType) {
    var currentView = global.App.router.currentView;

    _.each(global.App.buttons, function(buttonId) {
      this._setButtonActionOnNotification(buttonId, currentView, selectedNotificationType);
    }, this);
  },

  _setButtonActionOnNotification: function(buttonId, currentView, selectedNotificationType) {
    if (selectedNotificationType.buttonEvents && selectedNotificationType.buttonEvents[buttonId]) {
      var configuredButtonEvent = selectedNotificationType.buttonEvents[buttonId];
      currentView.listenTo(currentView, buttonId, selectedNotificationType[configuredButtonEvent]);
    }

    currentView.listenTo(currentView, buttonId, _.bind(this.cancelNotification, this));
  },

  cancelNotification: function() {
    $(this.NOTIFICATION_POPUP_SELECTOR).hide();
    $(this.NOTIFICATION_MESSAGE_SELECTOR).text('');

    global.App.router.currentView.setButtonEvents();
  },

  render: function() {
    this.$el.append(this.template());
    return this;
  }

});

module.exports = NotificationsPanel;
