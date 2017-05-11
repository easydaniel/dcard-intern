var mongoose = require('mongoose');

module.exports = function() {
    // register models
    require('./models/Todo');
    // connect to database
    mongoose.connect('mongodb://localhost/todos', function(err) {
				if (err)
						console.error(err);
        console.log('connected to database!')
    });

};
