
export default {
// module.exports = {
    // schema: "./utils/schema.js",
    schema: "./utils/schema.js",
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST || "sql12.freemysqlhosting.net",
        user: process.env.DB_USER || "sql12728933" ,
        database: process.env.DB_NAME || "sql12728933",
        password: process.env.DB_PASSWORD || "yrGdchL1q7",
        port: process.env.DB_PORT || 3306
    }
  };