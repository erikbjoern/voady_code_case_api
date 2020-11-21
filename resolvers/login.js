const login = async (parent, { email, password }, context) => {
  const { user } = await context.authenticate("graphql-local", {
    email,
    password,
  });
  await context.login(user);
  return { user };
};

module.exports = login;
