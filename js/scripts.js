function NewList() {
  this.tasks = [],
  this.currentId = 0;
}

NewList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

NewList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

NewList.prototype.findTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }
  };
  return false;
};

NewList.prototype.deleteTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
};

function Task (name, time, priority) {
  this.name = name
  this.time = time
  this.priority = priority
};


Task.prototype.allInfo = function() {
  return this.name + ", " + this.time + ", " + this.priority
};

// user interface
var todaysChores = new NewList();

function displayTask(todaysChoresToDisplay){
  var taskList1 = $("#tasks");
  var htmlForListInfo = "";
  todaysChoresToDisplay.tasks.forEach(function(task){
    htmlForListInfo += "<li id=" + task.id + ">" + task.name + " "+ "</li>";
  });
  taskList1.html(htmlForListInfo);
};

function showTask(taskId) {
  var task = todaysChores.findTask(taskId);
  $("#show-list").show();
  $(".name").html(task.name);
  $(".time").html(task.time);
  $(".important").html(task.priority);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + task.id + ">Delete</button>");
};

function attachContactListeners() {
  $("ul#tasks").on("click", "li", function() {
    showTask(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    todaysChores.deleteTask(this.id);
    $("#show-list").hide();
    displayTask(todaysChores);
  });
};

$(document).ready(function(){
  attachContactListeners();
  $('#chores').submit(function(event){
    event.preventDefault();
    var firstInput = $('#name').val();
    var secondInput = $('#time').val();
    var thirdInput = $('#priority').val();
    $("#name").val("");
    $('#time').val("");
    $('#priority').val("");
    var newTask = new Task(firstInput,secondInput,thirdInput);
    todaysChores.addTask(newTask);
    displayTask(todaysChores);
    console.log(todaysChores.tasks);
    console.log(todaysChores);
  });
});
