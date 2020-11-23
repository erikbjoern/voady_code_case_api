const logout = async (parent, { email }, context) => {
  let user
  
  if (context.getUser().email === email) {
    user = context.getUser()
  }

  await context.logout(user);

  return { user };
};

module.exports = logout;
