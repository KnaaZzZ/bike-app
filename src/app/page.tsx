import React from 'react';
import Constructor from '../components/constructor';
import { useConstructorContext } from '../contexts/constructor';

function Page() {
	return (
		<div>
			<Constructor />
		</div>
	);
}

export default Page;
