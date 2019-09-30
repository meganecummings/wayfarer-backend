const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

// --------------------- MIDDLEWARE --------------------- //

app.use(express.json());

// User Sessions
app.use(session({
    secret: 'i like waffles',
    resave: false,
    saveUninitialized: false
}));


const whitelist = ['https://meganecummings.github.io']
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

// app.options('*', cors()) 
app.use(cors(corsOptions));

  // --------------------- ROUTES --------------------- //

//  Get Root Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to WAYFARER</h1>');
});

// API Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/posts', routes.posts);
app.use('/api/v1/cities', routes.cities);
app.use('/api/v1/comments', routes.comments);


// --------------------- START SERVER --------------------- //
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
