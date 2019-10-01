const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');


// --------------------- MIDDLEWARE --------------------- //


// // BodyParser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


app.use(express.json());


// Custom Logger Middleware
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleString();
  console.table({ url, method, requestedAt });
  next();
})


// User Sessions
app.use(session({
    secret: 'i like waffles',
    resave: false,
    saveUninitialized: false
}));


const corsOptions = {
  origin: ["https://meganecummings.github.io"],
  credentials: true,
  optionsSuccessStatus: 200, 
  preflight: true,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  preflightContinue: true
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Authorization");
  next();
});

// app.use(function (req, response, next) {
//   response.setheader("Access-Control-Allow-Origin", 'https://meganecummings.github.io');
//   next();
// });


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
