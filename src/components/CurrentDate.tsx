'use client';

import { useEffect, useState } from 'react';

export default function CurrentDate() {
	const [date, setDate] = useState('');

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- client-only date, never runs on server
		setDate(
			new Date().toLocaleDateString('bn-BD', {
				dateStyle: 'full',
			}),
		);
	}, []);

	if (!date) return null;

	return <span>{date}</span>;
}
