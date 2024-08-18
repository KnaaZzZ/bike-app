'use client';

import React from 'react';
import { ConstructorStructure } from '@/src/types/constructor';
import { useConstructorContext } from '@/src/contexts/constructor';
import StructureCard from './StructureCard';

function renderChildStructures(childStructure: ConstructorStructure) {
	return (
		<div className='flex flex-col bg-white border rounded-md shadow-md p-4 m-2'>
			<div className=''>
				<StructureCard structure={childStructure} />
			</div>
			{childStructure.childStructures.length > 0 && (
				<ul className='pl-4 mt-2 border-l-2 border-gray-300 space-y-2'>
					{childStructure.childStructures.map((s) => (
						<li key={s.id}>{renderChildStructures(s)}</li>
					))}
				</ul>
			)}
		</div>
	);
}

function Constructor() {
	const { structure } = useConstructorContext();

	return (
		<div className='p-5 bg-gray-100 min-h-screen'>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Constructor Visualization
			</h1>
			{renderChildStructures(structure)}
		</div>
	);
}

export default Constructor;
