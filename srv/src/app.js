const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongodb = require('./mongodb');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(mongodb);
app.configure(rest());
app.configure(socketio({
    transports: ['websocket', 'polling']
}, function (io) {
    io.on('connection', function (socket) {
        // on reconnection, reset the transports option, as the Websocket
        // connection may have failed (caused by proxy, firewall, browser, ...)
        socket.on('reconnect_attempt', () => {
            console.log('reconnect attempt is on')
            socket.io.opts.transports = ['websocket', 'polling'];
        });
        socket.emit('connect_message', { text: 'new client connected!' }); // emit an event to the socket
        io.emit('broadcast', {text: 'broadcast to all the channels'}); // emit an event to all connected sockets
    });

    // Registering Socket.io middleware
    io.use(function (socket, next) {
        // Exposing a request property to services and hooks
        socket.feathers.referrer = socket.request.referrer;
        socket.feathers.provider = 'socketio'
        console.log('socket middleware registered Ok', Date.now());
        next();
    });
}));


// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Available options are listed in the "Options" section

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
