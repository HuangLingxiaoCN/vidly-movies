const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
  // handle uncaughtException
  process.on("uncaughtException", (ex) => {
    console.log(ex.message)
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    console.log(ex.message)
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: process.env.DATABASE_URL,
      level: "info",
    })
  );
};
