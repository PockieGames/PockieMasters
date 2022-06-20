import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import Database from "../Database";
import User from "./User";

interface HeroesFields {
    id: number
    heroId: number
    ownerId: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface HeroesInput extends Optional<HeroesFields, 'id'> { }
export interface HeroesOutput extends Required<HeroesFields> { }

class Heroes extends Model<HeroesFields, HeroesInput> implements HeroesFields {

    id!: number
    heroId!: number
    ownerId!: ForeignKey<User['id']>

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

}

Heroes.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    heroId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    ownerId: {
        type: DataTypes.INTEGER.UNSIGNED,
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

export default Heroes

// Relation
User.hasMany(Heroes, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: '_heroes'
});