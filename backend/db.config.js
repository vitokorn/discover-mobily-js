module.exports = {
    user: process.env.user,
    password: process.env.password,
    db: process.env.db,
    host: process.env.host,
    dialect: "postgres",
    ssl: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};