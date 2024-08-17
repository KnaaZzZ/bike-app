import React, { ReactNode, useState } from 'react';

type ComponentParams = {
	value: string;
	placeholder: string;
	children: ReactNode;
};

function Dropdown({ value, placeholder, children }: ComponentParams) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className='relative'>
			<button
				type='button'
				onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				className='bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600'
			>
				{value !== '' ? value : placeholder}
			</button>
			{isOpen && (
				<div className='absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg'>
					{children}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
