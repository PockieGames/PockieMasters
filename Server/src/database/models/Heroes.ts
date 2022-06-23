import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import Database from "../Database";
import User from "./User";

interface HeroesFields {
    id: number
    heroId: number
    ownerId: number
    lvl: number
    exp: number
    item1: number
    item2: number
    item3: number
    item4: number
    item5: number
    item6: number
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
    lvl!: number
    exp!: number
    item1!: number
    item2!: number
    item3!: number
    item4!: number
    item5!: number
    item6!: number

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
    },
    lvl: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1
    },
    exp: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item1: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item2: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item3: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item4: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item5: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    item6: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
    },
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