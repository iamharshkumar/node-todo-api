var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/',function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});

router.post('/',function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.json(newTodo)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:todoId',function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundtodo){
        res.json(foundtodo)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:todoId',function(req,res){
    db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body)
    .then(function(updatetodo){
        res.json(updatetodo)
    })
    .catch(function(err){
        res.send(err)
    })
})


router.delete('/:todoId',function(req,res){
    db.Todo.remove({_id:req.params.todoId})
    .then(function(deletetodo){
        res.json({message:'we deleted it'})
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = router;