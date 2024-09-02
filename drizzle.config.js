
export default {
// module.exports = {
    // schema: "./utils/schema.js",
    schema: "./utils/schema.js",
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
  };