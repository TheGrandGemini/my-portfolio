import Image from 'next/image';

interface TestimonyCardProps {
	rating: number;
	text: string;
	authorName: string;
	authorPosition: string;
	authorAvatar?: string;
}

export default function TestimonyCard({
	rating,
	text,
	authorName,
	authorPosition,
	authorAvatar,
}: TestimonyCardProps) {
	const renderStars = (numStars: number) => {
		const actualRating = Math.min(Math.max(1, numStars), 5);

		return Array.from({ length: 5 }, (_, i) => (
			<svg
				key={i}
				className={`w-6 h-6 ${
					i < actualRating ? 'text-accent-500' : 'text-gray-600'
				} fill-current`}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				aria-hidden='true'>
				<path d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279-6.064-5.828 8.332-1.151z' />
			</svg>
		));
	};

	// Safe check for initial
	const initialLetter = authorName?.charAt(0).toUpperCase() || '';

	return (
		<div className='bg-bg-600 rounded-3xl flex flex-col items-start justify-center p-4 shadow-lg max-w-sm mx-auto'>
			{/* Stars */}
			<div className='flex items-center justify-center gap-1 mb-4'>
				{renderStars(rating)}
			</div>

			{/* Testimony Text */}
			<p className='text-xl mb-6 leading-relaxed font-normal'>{text}</p>

			{/* Author Info */}
			<div className='flex justify-center items-end gap-2'>
				{/* Avatar Logic */}
				{authorAvatar ? (
					<div className='w-[60px] h-[60px] border-2 border-border-stroke rounded-full mr-4 overflow-hidden relative'>
						<Image
							src={authorAvatar}
							alt={`${authorName} Avatar`}
							fill
							className='object-cover'
						/>
					</div>
				) : (
					<div className='w-[60px] h-[60px] border-2 border-border-stroke rounded-full mr-4 bg-bg-600 flex items-center justify-center text-xl font-bold text-primary shrink-0'>
						{initialLetter}
					</div>
				)}

				{/* Name and Position */}
				<div className='flex flex-col gap-1'>
					<p className='text-xl font-bold'>{authorName}</p>
					<p className='text-muted text-base font-medium'>{authorPosition}</p>
				</div>
			</div>
		</div>
	);
}
