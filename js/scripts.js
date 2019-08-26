function ToDoList() {
  this.tasks = [],
  this.currentId = 0
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

ToDoList.prototype.assignId = function() {
  this.currentId ++1
  return this.currentId;
}

function Task (name, time, priority) {
  this.name = name
  this.time = time
  this.priority = priority
};

Task.prototype.allInfo = function(allInfo) {
  return this.name + ", " + this.time + ", " + this.priority
};

$(document).ready(function(){
  $('#chores').submit(function(event){
    event.preventDefault();
    var userInput = new Task($('#name').val(), $('#time').val(), $('#priority').val());
    console.log(userInput);
  });
});
