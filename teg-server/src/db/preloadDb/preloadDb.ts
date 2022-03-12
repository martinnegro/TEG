import { Model, ModelCtor } from "sequelize";

import colors from './colors';
import statuses from './statuses';

type ModelSeq = ModelCtor<Model<any, any>>

export default async function preloadDb(colorModel: ModelSeq, statusModel: ModelSeq) {
    await colorModel.bulkCreate(colors)
    await statusModel.bulkCreate(statuses)
};