import {
	ConstructorItemGroup,
	ConstructorStructure,
	ConstructorItem,
} from '@/src/types/constructor';
import {
	generateChildStructure,
	updateChildStructures,
} from '@/src/utils/constructor';
import { useEffect, useState } from 'react';

function useConstructor() {
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
	} // TODO: move to utils

	useEffect(() => {
		const items: ConstructorItem[] = [];
		loadItemGroups(items);
	}, []);

	const [structure, setStructure] = useState<ConstructorStructure>({
		id: '',

		type: {
			id: '',
			name: 'FRAME',
		}, // LOAD ON STARTUP
		items: [],

		selectedItem: null,
		childStructures: [],
	});

	function selectItem(
		targetStructure: ConstructorStructure,
		selectedItem: ConstructorItem | null
	): void {
		const childStructures: ConstructorStructure[] = generateChildStructure(
			itemGroups,
			selectedItem
		);

		setStructure((prevStructure) =>
			updateChildStructures(prevStructure, {
				...targetStructure,
				selectedItem,
				childStructures,
			})
		);
	}

	return { loadItemGroups, structure, selectItem };
}

export default useConstructor;
