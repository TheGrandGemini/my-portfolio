import Image from 'next/image';
import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';
import Button from '@/Components/UI/Button';

interface ProjectCardProps {
	id: number;
	title: string;
	category: string;
	description: string;
	imageSrc: string;
	techIcons: { src: string; alt: string }[];
	projectLink: string;
	repoLink?: string;
}

export default function ProjectCard({
	title,
	category,
	description,
	imageSrc,
	techIcons,
	projectLink,
}: ProjectCardProps) {
	return (
		<div className='relative shrink-0 w-[330px] md:w-[550px] bg-bg-700 rounded-3xl overflow-hidden shadow-xl mx-4'>
			{/* Project Image/Preview */}

			<div className='relative w-full aspect-video md:aspect-video lg:aspect-3/2 overflow-hidden rounded-t-3xl'>
				<Image
					src={imageSrc}
					alt={`${title} project preview`}
					layout='fill'
					objectFit='cover'
					priority
				/>
				<span className='absolute top-4 right-4 bg-muted text-secondary text-xs font-semibold px-3 py-1 rounded-full z-10'>
					{category}
				</span>
			</div>

			{/* Project Details */}
			<div className='p-6 md:p-8 flex flex-col justify-between min-h-[280px]'>
				{' '}
				{/* Adjusted min-h */}
				<div>
					<div className='flex justify-between items-start'>
						<h3 className='text-xl md:text-2xl font-bold text-white mb-3'>
							{title}
						</h3>
					</div>

					<p className='text-secondary text-sm md:text-base mb-6 line-clamp-4'>
						{description}
					</p>
				</div>
				{/* Tech Stack Icons */}
				<div className='flex items-center space-x-4 mb-6 mt-auto'>
					{techIcons.map((icon, index) => (
						<Image
							key={index}
							src={icon.src}
							alt={icon.alt}
							width={28}
							height={28}
							className='w-7 h-7 object-contain'
						/>
					))}
				</div>
				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4'>
					<Link
						href={projectLink}
						target='_blank'
						rel='noopener noreferrer'>
						<Button className='flex justify-center items-center gap-2'>
							<span>View Project</span>
							<span>
								<BiRightArrowAlt className='text-xl' />
							</span>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
