type Product = {
	id: string;

	type: ProductType;
	filters: ProductFilter[];

	name: string;
	description: string;
	price: string;
	theme: string[];
};

type ProductType = {
	id: string;

	name: string;

	childrenTypeIds: string[];
};

type ProductFilter = {};

type User = {};
