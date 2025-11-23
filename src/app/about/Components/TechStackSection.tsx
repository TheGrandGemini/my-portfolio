import { motion } from 'framer-motion';
import StackIcon from './StackIcon';

interface TechIconData {
	src: string;
	alt: string;
	name: string;
}

interface TechStackSectionProps {
	heading: string;
	icons: TechIconData[];
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const TechStackSection = ({ heading, icons }: TechStackSectionProps) => {
	return (
		<section className='py-4 px-2 md:px-4'>
			<motion.h3
				className='text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-8 text-left'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true, amount: 0.8 }}>
				{heading}
			</motion.h3>

			<motion.div
				className='flex flex-wrap justify-start gap-x-6 gap-y-8 lg:gap-x-10 lg:gap-y-12'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				viewport={{ once: true, amount: 0.5 }}>
				{icons.map((icon, index) => (
					<StackIcon
						key={icon.name || index}
						src={icon.src}
						alt={icon.alt}
						name={icon.name}
					/>
				))}
			</motion.div>
		</section>
	);
};

export default TechStackSection;
