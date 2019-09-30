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


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://meganecummings.github.io');
  next();
});

app.get('/', (req, res) => {
  request(
    { url: 'https://meganecummings.github.io' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});


// const corsOptions = {
//   origin: ["https://meganecummings.github.io"],
//   credentials: true,
//   preflightContinue: true,

//   optionsSuccessStatus: 200
// };


// app.use(cors(corsOptions));
// app.options('*', cors()) 

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
