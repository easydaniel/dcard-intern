// mongoose model definition
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// todo model
var ipSchema = new Schema({
    ip: String,
    limit: {
        type: Number,
        default: 1000
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('IP', ipSchema);
//

const Ip = mongoose.model('IP');

const limiter = function(req, res, next) {
    Ip.findOne({
        ip: req.ip
    }, function(err, ip) {
        if (err)
            res.send(err)
        if (ip == null || Math.floor((new Date() - new Date(ip.create_at)) / 1000 * 60 * 60) >= 1) {
            // new ip
            Ip.update({
                ip: req.ip
            }, {
                limit: 1000
            }, {
                upsert: true
            }, function(err, myip) {
                if (err)
                    res.send(err)
                res.set('X-RateLimit-Remaining', 1000);
                let reset = new Date();
                reset.setHour(reset.getHours() + 1);
                res.set('X-RateLimit-Reset', reset.getTime());
                next();
            });
        }
        if (ip.limit === 0) {
            res.send(429, 'Too Many Requests')
        }
        ip.limit -= 1;
        ip.save();
        res.set('X-RateLimit-Remaining', ip.limit);
        next();
    })
}
