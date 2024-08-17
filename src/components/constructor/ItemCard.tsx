import { ConstructorStructure } from '@/src/types/constructor';
import React, { useState } from 'react';
import { useConstructorContext } from '@/src/contexts/constructor';
import Dropdown from '../reusable/Dropdown';

type ComponentParams = {
	structure: ConstructorStructure;
};

function ItemCard({ structure }: ComponentParams) {
	const { selectItem } = useConstructorContext();
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	return (
		<div className='h-full m-2 p-4 bg-blue-50 border border-blue-300 rounded-md shadow-md'>
			<h2 className='text-lg font-semibold mb-2 text-blue-700'>
				Structure ID: {structure.id}
			</h2>
			<Dropdown
				value={structure.selectedItem?.id || ''}
				placeholder='Select item'
			>
				<ul className='bg-white rounded shadow-lg border border-gray-200'>
					{structure.items.map((item, index) => (
						<li key={item.id} className='p-2 hover:bg-gray-100'>
							<button
								type='button'
								className={`w-full text-left ${
									selectedIndex === index ? 'bg-blue-100' : ''
								}`}
								onClick={() => {
									setSelectedIndex(
										index === selectedIndex ? -1 : index
									);
									selectItem(
										structure,
										index !== selectedIndex
											? structure.items[index] || null
											: null
									);
								}}
							>
								{item.id}
							</button>
						</li>
					))}
				</ul>
			</Dropdown>
		</div>
	);
}

export default ItemCard;
