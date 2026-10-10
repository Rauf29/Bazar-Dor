export default function Loading() {
	return (
		<div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 py-16">
			<span className="size-10 animate-spin rounded-full border-4 border-[#dfe8e0] border-t-[#078b45]" />
			<p className="text-base font-semibold text-[#68746c]">
				লোড হচ্ছে...
			</p>
			<div className="w-full space-y-3">
				<div className="h-8 w-3/4 animate-pulse rounded-lg bg-[#e5ece6]" />
				<div className="h-64 w-full animate-pulse rounded-2xl bg-[#e5ece6]" />
				<div className="h-4 w-full animate-pulse rounded bg-[#e5ece6]" />
				<div className="h-4 w-5/6 animate-pulse rounded bg-[#e5ece6]" />
				<div className="h-4 w-2/3 animate-pulse rounded bg-[#e5ece6]" />
			</div>
		</div>
	);
}
