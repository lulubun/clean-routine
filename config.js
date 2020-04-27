//var productionDbURL = 'mongodb://tealogger:tealoggerpassword@ds161018.mlab.com:61018/tealog';

exports.DATABASE_URL = productionDbURL || process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/clean_routine';

exports.PORT = process.env.PORT || 8080;