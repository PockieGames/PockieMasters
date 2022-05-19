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
    }
  }, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
  })

  export default User