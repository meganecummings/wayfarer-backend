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
  preflightContinue: true,
  credentials: false,
  header: true,
  preflightContinue: true,
  optionsSuccessStatus: 200
};



app.use(cors(corsOptions));

  // --------------------- ROUTES --------------------- //

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
