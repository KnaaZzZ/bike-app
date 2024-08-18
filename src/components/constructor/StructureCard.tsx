import { ConstructorStructure } from '@/src/types/constructor';
import React, { useState } from 'react';
import { useConstructorContext } from '@/src/contexts/constructor';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import ItemCard from './ItemCard';

type ComponentParams = {
	structure: ConstructorStructure;
};

function StructureCard({ structure }: ComponentParams) {
	const { selectItem } = useConstructorContext();
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	const [isArrowVisible, setIsArrowVisible] = useState<boolean>(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	return (
		<div className='flex flex-col gap-[5px]'>
			<div
				className={`flex flex-col gap-[5px] ${isArrowVisible || isDropdownOpen ? 'w-[255px]' : 'w-[200px]'}`}
				onMouseEnter={() => setIsArrowVisible(true)}
				onMouseLeave={() => setIsArrowVisible(false)}
			>
				<div
					className={`flex items-center justify-center ${isArrowVisible || isDropdownOpen ? 'w-[255px]' : 'w-[200px]'} h-[50px] rounded-[10px] border-[5px] border-[#FDC500] bg-[#FFD500]`}
				>
					<p className='font-bold text-[20px]'>
						{structure.type.name}
					</p>
				</div>
				<div className='flex flex-row gap-[5px]'>
					<ItemCard item={structure.selectedItem} />
					{(isArrowVisible || isDropdownOpen) && (
						<div className='w-[50px] rounded-[10px] bg-[#00296B]'>
							<button
								className='flex justify-center items-center h-full w-full '
								type='button'
								onClick={() => {
									setIsDropdownOpen(
										(prevIsDropdownOpen) =>
											!prevIsDropdownOpen
									);
								}}
							>
								{!isDropdownOpen ? (
									<FaCaretDown color='white' size='25px' />
								) : (
									<FaCaretUp color='white' size='25px' />
								)}
							</button>
						</div>
					)}
				</div>
			</div>
			{isDropdownOpen && (
				<div>
					<ul
						className={`w-[${((structure.items.length + 1) / 3) * 205 - 5}] grid gap-[5px] grid-cols-${(structure.items.length + 1) / 3}`}
					>
						{[null, ...structure.items].map((item, index) => (
							<li key={item?.id || ''}>
								<button
									type='button'
									aria-label={`Select item ${index}`}
									onClick={() => {
										setSelectedIndex(index - 1);
										selectItem(
											structure,
											index === -1
												? null
												: structure.items[index - 1]
										);
									}}
								>
									<ItemCard
										item={item}
										selected={index - 1 === selectedIndex}
									/>
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default StructureCard;
