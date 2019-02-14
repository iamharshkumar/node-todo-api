/* global $  */
$(document).ready(function(){
    $.get('api/todos')
    .then(addTodos)
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo()
        }
    })
    
    $('.list').on('click','li',function(){
        updateTodo($(this))
        
    })
    
    $('.list').on('click','span',function(e){
        e.stopPropagation();
        var clickedId = $(this).parent().data('id');
        $(this).parent().remove()
        $.ajax({
            method:'DELETE',
            url:'api/todos/' + clickedId
        })
        .then(function(data){
            
        })
    })
})

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo)
    })
}

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + '<span>x</span> </li>');
        newTodo.data('id', todo._id)
        newTodo.data('completed',todo.completed)
        if(todo.completed){
            newTodo.addClass('done');
        }
        $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $('#todoInput').val()
    $.post('/api/todos',{name:userInput})
    .then(function(newTodo){
        $('#todoInput').val('')
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err)
    })
}

function updateTodo(todo){
    var clickedId = todo.data('id');
    var isDone = todo.data('completed');
    var updateData = {completed: !isDone}
    $.ajax({
        method:'PUT',
        url:'/api/todos/' + clickedId,
        data: updateData
    })
    .then(function(updatedData){
        todo.toggleClass("done")
        todo.data('completed',isDone)
    })
}