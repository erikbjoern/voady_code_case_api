const bodyParser = require("body-parser");
const express = require("express");
const models = require("./models");
const passport = require("passport");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { ApolloServer } = require("apollo-server-express");
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport')

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const users = await models.User.findAll();
    const matchingUser = users.find(user => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  })
)

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res })
})

server.applyMiddleware({ app });

app.listen(3000, () =>
  console.log("Server listening on localhost:3000/graphql")
);
