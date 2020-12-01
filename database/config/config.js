module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "voady_code_case_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "voady_code_case_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}