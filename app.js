const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const models = require("./models");
const passport = require("passport");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const session = require("express-session");
const { ApolloServer } = require("apollo-server-express");
const { GraphQLLocalStrategy, buildContext } = require("graphql-passport");
const { Pool } = require("pg");
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CLIENT_URL || "http://localhost";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const matchingUser = await models.User.findOne({
      where: { email, password },
    });
    const error = matchingUser
      ? null
      : new Error("Fel email-adress eller lösenord");
    done(error, matchingUser);
  })
);

const app = express();
const corsOptions = { origin: ORIGIN, credentials: true };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1)
app.use(
  session({
    secret: "reallysecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
      sameSite: "none",
      secure: true
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res }),
});

server.applyMiddleware({ app, cors: corsOptions });

app.listen(PORT, () =>
  console.log(`Server listening on localhost:${PORT}/graphql`)
);
