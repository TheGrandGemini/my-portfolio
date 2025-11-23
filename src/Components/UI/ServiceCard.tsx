import Image from 'next/image';
import { motion } from 'framer-motion';

interface ContentCardProps {
	imageSrc: string;
	imageAlt: string;
	heading: string;
	paragraph: string;
}

export default function ServiceCard({
	imageSrc,
	imageAlt,
	heading,
	paragraph,
}: ContentCardProps) {
	return (
		<motion.div
			className='bg-bg-600 rounded-lg border-2 border-border-subtle overflow-hidden shadow-lg flex flex-col'
			whileHover={{
				scale: 1.05,
				boxShadow:
					'0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
			}}
			whileTap={{ scale: 0.98 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.8 }}>
			{/* Image Section */}
			<div className='flex items-center justify-center rounded-t-2xl'>
				<Image
					src={imageSrc}
					alt={imageAlt}
					width={400}
					height={200}
					className='object-cover h-[182px] md:h-[250px] w-full drop-shadow-lg rounded-t-2xl'
				/>
			</div>

			{/* Text Content Section */}
			<div className='p-3 sm:p-5 flex flex-col gap-3 w-full '>
				<h2 className='text-[28px] sm:text-4xl font-medium text-muted leading-tight'>
					{heading}
				</h2>
				<p className='text-base font-semibold sm:text-lg text-primary leading-relaxed grow'>
					{paragraph}
				</p>
			</div>
		</motion.div>
	);
}
