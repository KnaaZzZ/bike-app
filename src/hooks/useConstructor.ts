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
		const items: ConstructorItem[] = [
			{
				id: 'item1',
				typeId: 'type1',
				childTypeIds: ['type2', 'type3'],
				value: 'Sample value 1',
			},
			{
				id: 'item2',
				typeId: 'type1',
				childTypeIds: ['type4'],
				value: 'Sample value 2',
			},
			{
				id: 'item3',
				typeId: 'type2',
				childTypeIds: ['type5'],
				value: 'Sample value 3',
			},
			{
				id: 'item4',
				typeId: 'type2',
				childTypeIds: [],
				value: 'Sample value 4',
			},
			{
				id: 'item5',
				typeId: 'type3',
				childTypeIds: ['type6', 'type7'],
				value: 'Sample value 5',
			},
			{
				id: 'item6',
				typeId: 'type3',
				childTypeIds: ['type8'],
				value: 'Sample value 6',
			},
			{
				id: 'item7',
				typeId: 'type4',
				childTypeIds: [],
				value: 'Sample value 7',
			},
			{
				id: 'item8',
				typeId: 'type4',
				childTypeIds: ['type9', 'type10'],
				value: 'Sample value 8',
			},
			{
				id: 'item9',
				typeId: 'type5',
				childTypeIds: [],
				value: 'Sample value 9',
			},
			{
				id: 'item10',
				typeId: 'type5',
				childTypeIds: ['type6'],
				value: 'Sample value 10',
			},
		];
		loadItemGroups(items);
	}, []); // temp for testing

	const [structure, setStructure] = useState<ConstructorStructure>({
		id: '',

		typeId: 'type1',
		items: [
			{
				id: 'item1',
				typeId: 'type1',
				childTypeIds: ['type2', 'type3'],
				value: 'Sample value 1',
			},
			{
				id: 'item2',
				typeId: 'type1',
				childTypeIds: ['type4'],
				value: 'Sample value 2',
			},
		],

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
