import MySQL from 'mysql'
import { Sequelize } from 'sequelize'

export default class Database {

    static connection: Sequelize

    static async connect(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {

            Database.connection = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                username: 'root',
                password: '',
                database: 'pockie'
            });

            Database.connection.authenticate()
            .then(() => {
                console.log('Connected to Database');
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        })
    }

    static query(queryString: string, options: any){
        Database.connection.query(queryString, options)
    }
}