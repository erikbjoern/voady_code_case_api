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
      : new Error("incorrect email or password");
    done(error, matchingUser);
  })
);

const app = express();
const corsOptions = { origin: "http://localhost:8080", credentials: true }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "reallysecret",
    resave: false,
    saveUninitialized: true,
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

app.listen(3000, () =>
  console.log("Server listening on localhost:3000/graphql")
);
