type ConstructorStructure = {
	id: string;

	typeId: string;
	items: ConstructorItem[];

	selectedItem: ConstructorItem | null;
	childStructures: ConstructorStructure[];
};

type ConstructorItem = {
	id: string;

	typeId: string;
	childTypeIds: string[];

	value: any;
};
type ConstructorItemGroup = {
	typeId: string;

	items: ConstructorItem[];
};

export type { ConstructorStructure, ConstructorItem, ConstructorItemGroup };
