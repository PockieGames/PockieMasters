import MySQL from 'mysql'
import { Sequelize } from 'sequelize'
import Logger from '../logger'

export default class Database {

    static connection: Sequelize

    static async connect(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {

            Database.connection = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                username: 'root',
                password: '',
                database: 'pockie',
                logging: false
            })

            Database.connection.authenticate()
                .then(() => {
                    Logger.log('Connected to Database')
                    resolve(true)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    static query(queryString: string, options: any){
        Database.connection.query(queryString, options)
    }
}

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'pockie',
    logging: false
})