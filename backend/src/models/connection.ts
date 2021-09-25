import { Sequelize } from "sequelize";

const connection = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
})

export default connection;
