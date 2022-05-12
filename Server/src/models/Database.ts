import MySQL from 'mysql'

export default class Database {

    static connection: MySQL.Connection

    static async connect(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {

            Database.connection = MySQL.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'pockie'
            })
    
            Database.connection.connect((err) => {
                if (err) {
                    reject(false)
                    return
                }
                resolve(true)
                console.log('Connected to Database');
            })

        })
    }

    static query(queryString: string, options: any){
        Database.connection.query(queryString, options)
    }
}