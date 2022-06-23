import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import Database from "../../Database";

interface StaticChaptersFields {
    id: number
    chapter: number
    skin: string
    chapterData: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface StaticChaptersInput extends Optional<StaticChaptersFields, 'id'> { }
export interface StaticChaptersOutput extends Required<StaticChaptersFields> { }

class StaticChapters extends Model<StaticChaptersFields, StaticChaptersInput> implements StaticChaptersFields {

    id!: number
    chapter!: number
    skin!: string
    chapterData!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

}

StaticChapters.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    chapter: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    skin: {
        type: DataTypes.STRING
    },
    chapterData: {
        type: DataTypes.JSON
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

export default StaticChapters