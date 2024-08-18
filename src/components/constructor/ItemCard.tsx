import React from 'react';
import { ConstructorItem } from '@/src/types/constructor';

type ComponentParams = {
	item: ConstructorItem | null;
	selected?: boolean;
};

function ItemCard({ item, selected = false }: ComponentParams) {
	return (
		<div className='flex flex-col w-[200px] h-[200px]'>
			<div
				className={`flex items-center justify-center h-[50px] rounded-t-[10px] ${!selected ? 'bg-[#00296B]' : 'bg-[#FDC500]'}`}
			>
				<p
					className={`font-medium text-[16px] ${!selected ? 'text-white' : 'text-black'}`}
				>
					{item?.name}
				</p>
			</div>
			<div
				className={`flex items-center justify-center h-[150px] rounded-b-[10px] border-[5px] border-t-0 ${!selected ? 'border-[#00296B] bg-[#00509D]' : 'border-[#FDC500] bg-[#FFD500]'} `}
			>
				Image
			</div>
		</div>
	);
}

export default ItemCard;
