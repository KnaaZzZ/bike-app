import {
	ConstructorItemGroup,
	ConstructorItem,
	ConstructorStructure,
} from '@/src/types/constructor';

function generateChildStructure(
	itemGroups: ConstructorItemGroup[],
	selectedItem: ConstructorItem | null
): ConstructorStructure[] {
	const childStructure: ConstructorStructure[] = [];
	if (selectedItem) {
		const { childTypeIds } = selectedItem;
		childTypeIds.forEach((childTypeId) => {
			childStructure.push({
				id: Math.random().toString(36).substring(2, 9),

				typeId: childTypeId,
				items:
					itemGroups.find((i) => i.typeId === childTypeId)?.items ||
					[],

				selectedItem: null,
				childStructures: [],
			});
		});
	}

	return childStructure;
}

function updateChildStructures(
	currentStructure: ConstructorStructure,
	updatedStructure: ConstructorStructure
): ConstructorStructure {
	if (currentStructure.id === updatedStructure.id) {
		return updatedStructure;
	}
	return {
		...currentStructure,
		childStructures: currentStructure.childStructures.map((s) =>
			updateChildStructures(s, updatedStructure)
		),
	};
}

export { generateChildStructure, updateChildStructures };
