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
    left: 'back',
    top:'submitDone'
  },

  initialize: function() {
    var self = this;

    this.todoCollection = new TodoCollection();
    this.listenTo(this.todoCollection, 'change', this.render);

    //this.todoCollection.clear()
    //self.seedtodo();
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

  submitDone: function() {

    var arr = $('.toDoButton').map(function() {return this.id;}).get();
    var elementnts = arr.toString();

    //window.alert(elementnts);
    //window.alert(this.todoCollection.lengths)

    this.todoCollection.each(function(todo) {
      //todo.set({selected: true});
      //console.log(todo);
    }, this);

    for (var i = 0; i < arr.length; i += 1) {
      var status = Number(document.getElementById(arr[i] + '_taskStatus').innerHTML);
      var task = document.getElementById(arr[i] + '_task_description').innerHTML;

      //this.updateDataBase(arr[i],status,task);

      /*
               this.todoCollection.each(function(todo) {
                   console.log(JSON.stringify(todo.T_TASK_ID));
                  // if(todo.T_TASK_ID == arr[i])
                      //console.log("")
                   //todo.set({T_TASK_ID: 1, T_STATUS: 'doneee'});

               }, this);

              */

      // todo.set({T_TASK_ID: 1, T_STATUS: 'doneee'});

    }
  },

  updateDataBase: function(id,status,task) {

    /*
         this.todoCollection.each(function(todo) {
             window.alert(JSON.stringify(todo));
         }, this);

*/

    //window.alert("IN HERE "+id + ": " + status + " "+ task +" ");

    //window.alert("length of collection: "+this.todoCollection.length);
    /*
    if(hopperRef.keys(snap.val()) == 4){



    hopperRef.update({
      "T_STATUS": "status"
    });

    }
*/

    /*
        var ref = this.todoCollection.val();

        window.alert(ref.T_TASK_ID);
*/
    /*

         for(var i=0; i<this.todoCollection.length;i+=1){
             window.alert("IN HERE "+id + ": " + status + " "+ task +" ");
            window.alert("For loop ID: "+ this.todoCollection[i].T_TASK_ID);

             if(this.todoCollection[i].T_TASK_ID === id){
                 if(status === 4){
                   this.todoCollection[i].remove();
                   window.alert(id+": DELETED!!");

               }else {
                   this.todoCollection[i].T_STATUS = status;
                   window.alert(id+": UPDATED! ");
               }
             }
         }
*/
  },
        /*Send all the things with the thing again and again URGH I DUN KNOW*/
    goToDonePage: function(){
        global.App.navigate('finished_tasks');

 },

  goToHomePage: function() {
    global.App.navigate('');
  },

  render: function() {

    this.$el.html(this.template());

    var todoHTML = document.createDocumentFragment();

    this.todoCollection.each(function(todo) {
      window.alert(JSON.stringify(todo));
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
