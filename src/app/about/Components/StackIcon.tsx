import Image from 'next/image';
import { motion } from 'framer-motion';

interface StackIconProps {
	src: string;
	alt: string;
	name: string;
}

const StackIcon = ({ src, alt }: StackIconProps) => {
	return (
		<motion.div
			className='flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg
                       transition-all duration-200 ease-in-out'
			whileHover={{ scale: 1.1, translateY: -5 }}
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			viewport={{ once: true, amount: 0.8 }}>
			<Image
				src={src}
				alt={alt}
				width={70}
				height={70}
				className='w-8 h-8 sm:w-[60px] sm:h-[60px] object-contain'
			/>
		</motion.div>
	);
};

export default StackIcon;
