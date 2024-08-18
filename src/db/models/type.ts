import { Schema, models, model } from 'mongoose';

export type IType = {
	_id?: string;

	name: string;

	childrenTypeIds: string[];
};

const typeSchema: Schema = new Schema({
	_id: String,

	name: String,

	childrenTypeIds: [String],
});

const Type = models.Type || model<IType>('Type', typeSchema, 'types');

export default Type;
