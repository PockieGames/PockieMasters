import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import Database from "../../Database";

interface StaticHeroesFields {
    id: number
    name: string
    sprite: string
    type: string
    rarity: string
    spells: string
    attack: number
    movement: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface StaticHeroesInput extends Optional<StaticHeroesFields, 'id'> { }
export interface StaticHeroesOutput extends Required<StaticHeroesFields> { }

class StaticHeroes extends Model<StaticHeroesFields, StaticHeroesInput> implements StaticHeroesFields {

    id!: number
    name!: string
    sprite!: string
    type!: string
    rarity!: string
    spells!: string
    attack!: number
    movement!: number

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

}

StaticHeroes.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    sprite: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5", "6"),
    },
    rarity: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7"),
    },
    spells: {
        type: DataTypes.STRING,
    },
    attack: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    movement: {
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

export default StaticHeroes