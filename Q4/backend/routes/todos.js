var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

/* GET listing. */
router.get('/', function(req, res, next) {
    let query = {}
    if (req.query.completed) {
      query.completed = 'true' === req.query.completed
    }
    Todo.find(query, function(err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
});

router.post('/', function(req, res, next) {
    // create todo
    Todo.create({
        content: req.body.content
    }, function(err, todo) {
        if (err)
            res.send(err)
        res.json(todo);
    });
});

router.get('/delete', function(req, res, next) {
    Todo.remove({
      completed: false
    }, function(err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
});

router.get('/:id', function(req, res, next) {
    Todo.findOne({
        _id: req.params.id
    }, function(err, todo) {
        res.json(todo);
    });
});

router.get('/delete/:id', function(req, res, next) {
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
        if (err)
            res.send(err);
        res.json(todo);
    });
});


router.get('/toggle/:id', function(req, res, next) {

  Todo.findOne({
      _id: req.params.id
  }, function(err, todo) {
      todo.completed = !todo.completed
      todo.save();
      res.json(todo);
  });

})

router.post('/update/:id', function(req, res, next) {
    Todo.findOneAndUpdate({
        _id: req.params.id
    }, {
        content: req.body.content
    }, {
        new: true
    }, function(err, todo) {
        if (err)
            res.send(err)
        res.json(todo);
    });
});


module.exports = router;
