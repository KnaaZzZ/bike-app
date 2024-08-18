import { model, models, Schema } from 'mongoose';

export interface IProduct {
	_id?: string;

	name: string;
	description: string;
	price: number;

	typeId: string;
	filterIds: string[];

	compatibleWithTypeIds: string[];
}

const productSchema: Schema = new Schema({
	name: String,
	description: String,
	price: Number,

	typeId: String,
	filterIds: [String],

	compatibleWithTypeIds: [String],
});

const Product =
	models.Product || model<IProduct>('Product', productSchema, 'products');

export default Product;
