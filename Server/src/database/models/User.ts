import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import Database from "../Database";

interface UserFields {
    id: number
    uuid: string
    username?: string
    identifier: string
    password: string
    os: string
    osVersion: string
    language: string
    tutorialStep: number
    chapter: number
    currencyFree: number
    currencyPremium: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UserInput extends Optional<UserFields, 'id'> {}
export interface UserOuput extends Required<UserFields> {}

class User extends Model<UserFields, UserInput> implements UserFields{

    id!: number
    uuid!: string
    username!: string
    identifier!: string
    password!: string
    os!: string
    osVersion!: string
    language!: string
    chapter!: number
    tutorialStep!: number
    currencyFree!: number
    currencyPremium!: number

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

}

User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    os: {
      type: DataTypes.STRING
    },
    osVersion: {
      type: DataTypes.STRING
    },
    language: {
      type: DataTypes.STRING
    },
    tutorialStep: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },  
    chapter: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },  
    currencyFree: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currencyPremium: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    sequelize: new Sequelize({
      dialect: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'pockie',
      logging: false
  }),
    paranoid: true
  })

  export default User