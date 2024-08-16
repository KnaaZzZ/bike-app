import {
	ConstructorItemGroup,
	ConstructorItem,
	ConstructorStructure,
} from '@/types/constructor';

function generateChildStructure(
	itemGroups: ConstructorItemGroup[],
	selectedItem: ConstructorItem | null
): ConstructorStructure[] {
	const childStructure: ConstructorStructure[] = [];
	if (selectedItem) {
		const { childTypeIds } = selectedItem;
		childTypeIds.forEach((childTypeId) => {
			childStructure.push({
				id: '',

				typeId: childTypeId,
				items:
					itemGroups.find((i) => i.typeId === childTypeId)?.items ||
					[],

				selectedItem: null,
				childStructure: [],
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
		childStructure: currentStructure.childStructure.map((s) =>
			updateChildStructures(s, updatedStructure)
		),
	};
}

export { generateChildStructure, updateChildStructures };
