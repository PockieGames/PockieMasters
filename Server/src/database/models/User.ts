import { DataTypes, Model, Optional } from "sequelize";
import Database, { sequelize } from "../Database";

interface UserFields {
    id: number
    uuid: string
    identifier: string
    password: string
    os: string
    osVersion: string
    language: string
    tutorialStep: number
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
    identifier!: string
    password!: string
    os!: string
    osVersion!: string
    language!: string
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
    sequelize: sequelize,
    paranoid: true
  })

  export default User