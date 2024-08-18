type ConstructorStructure = {
	id: string;

	type: {
		id: string;
		name: string;
	};
	items: ConstructorItem[];

	selectedItem: ConstructorItem | null;
	childStructures: ConstructorStructure[];
};

type ConstructorItem = {
	id: string;

	typeId: string;
	childTypeIds: string[];

	name: string;
};
type ConstructorItemGroup = {
	typeId: string;

	items: ConstructorItem[];
};

export type { ConstructorStructure, ConstructorItem, ConstructorItemGroup };
