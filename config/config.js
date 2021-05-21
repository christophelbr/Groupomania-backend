module.exports = {
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret',
    },
    development: {
      username: "root",
      password: "Azertyuiop,123",
      database: "groupomania_development",
      host: "127.0.0.1",
      port: 8889,
      dialect: "mysql"
    },
    test: {
      username: "root",
      password: "Azertyuiop,123",
      database: "groupomania_test",
      host: "127.0.0.1",
      port: 8889,
      dialect: "mysql"
    },
    production: {
      username: "root",
      password: "Azertyuiop,123",
      database: "groupomania_production",
      host: "127.0.0.1",
      port: 8889,
      dialect: "mysql"
    }

  };