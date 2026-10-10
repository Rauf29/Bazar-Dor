'use client';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- mount once so SSR HTML matches
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return <ToastContainer position="top-center" autoClose={2500} />;
}
