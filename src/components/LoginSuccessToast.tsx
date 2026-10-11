'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function LoginSuccessToast() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const shown = useRef(false);

	useEffect(() => {
		if (searchParams.get('login') === 'success' && !shown.current) {
			shown.current = true;
			toast.success('সফলভাবে সাইন ইন হয়েছে');
			router.replace('/');
		}
	}, [searchParams, router]);

	return null;
}
