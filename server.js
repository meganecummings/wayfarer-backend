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


const corsOptions = {
  origin: ["https://meganecummings.github.io"],
  credentials: true,
  preflight: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

// app.options('*', cors()) 
app.use(cors(corsOptions));


// const whitelist = ['https://meganecummings.github.io/wayfarer/', 'https://meganecummings.github.io']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }, 
//   credentials: true,
//   optionsSuccessStatus: 200
// }

// // Then pass them to cors:
// app.use(cors(corsOptions));

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
