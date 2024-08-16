type ConstructorStructure = {
	id: string;

	typeId: string;
	items: ConstructorItem[];

	selectedItem: ConstructorItem | null;
	childStructure: ConstructorStructure[];
};

type ConstructorItem = {
	typeId: string;
	childTypeIds: string[];

	value: any;
};
type ConstructorItemGroup = {
	typeId: string;

	items: ConstructorItem[];
};

export type { ConstructorStructure, ConstructorItem, ConstructorItemGroup };
