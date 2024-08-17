'use client';

import React, { createContext, ReactNode, useContext } from 'react';
import useConstructor from '../hooks/useConstructor';
import { ConstructorItem, ConstructorStructure } from '../types/constructor';

type ConstructorContextType = {
	loadItemGroups: (items: ConstructorItem[]) => void;
	structure: ConstructorStructure;
	selectItem: (
		targetStructure: ConstructorStructure,
		selectedItem: ConstructorItem | null
	) => void;
};

export const ConstructorContext = createContext<ConstructorContextType | null>(
	null
);

type ContextProviderParams = {
	children: ReactNode;
};
function ConstructorContextProvider({ children }: ContextProviderParams) {
	const contructor = useConstructor();

	return (
		<ConstructorContext.Provider value={contructor}>
			{children}
		</ConstructorContext.Provider>
	);
}

export default ConstructorContextProvider;

export function useConstructorContext() {
	const context = useContext(ConstructorContext);
	if (!context) {
		throw new Error(
			'useConstructorContext must be within a ConstructorContextProvider'
		);
	}
	return context;
}
