import {
	ConstructorItemGroup,
	ConstructorStructure,
	ConstructorItem,
} from '@/types/constructor';
import {
	generateChildStructure,
	updateChildStructures,
} from '@/utils/constructor';
import { useState } from 'react';

function useContructor() {
	const [itemGroups, setItemGroups] = useState<ConstructorItemGroup[]>([]);

	function loadItemGroups(items: ConstructorItem[]) {
		const tempItemGroups: ConstructorItemGroup[] = [];

		items.forEach((item) => {
			const index = tempItemGroups.findIndex(
				(tempItemGroup) => tempItemGroup.typeId === item.typeId
			);
			if (index === -1) {
				tempItemGroups.push({
					typeId: item.typeId,
					items: [item],
				});
			} else {
				tempItemGroups[index].items.push(item);
			}
		});

		setItemGroups(tempItemGroups);
	}

	const [structure, setStructure] = useState<ConstructorStructure>({
		id: '',

		typeId: '',
		childStructure: [],

		items: [],
		selectedItem: null,
	});

	function selectItem(
		targetStructure: ConstructorStructure,
		selectedItem: ConstructorItem
	): void {
		const childStructure: ConstructorStructure[] = generateChildStructure(
			itemGroups,
			selectedItem
		);

		setStructure(
			updateChildStructures(structure, {
				...targetStructure,
				selectedItem,
				childStructure,
			})
		);
	}

	return { loadItemGroups, selectItem };
}

export default useContructor;
