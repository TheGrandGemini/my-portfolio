'use client';

import { motion } from 'framer-motion';
import Button from '@/Components/UI/Button';
import TechStackSection from '@/app/about/Components/TechStackSection';

const frontendStacks = [
	{ src: '/logos/html.svg', alt: 'HTML5 Logo', name: 'HTML5' },
	{ src: '/logos/css.svg', alt: 'CSS3 Logo', name: 'CSS3' },
	{ src: '/logos/javascript.svg', alt: 'JavaScript Logo', name: 'JavaScript' },
	{ src: '/logos/react.svg', alt: 'React Logo', name: 'React' },
	{ src: '/logos/nextjs.svg', alt: 'Next.js Logo', name: 'Next.js' },
	{ src: '/logos/typescript.svg', alt: 'TypeScript Logo', name: 'TypeScript' },
	{
		src: '/logos/tailwindcss.svg',
		alt: 'Tailwind CSS Logo',
		name: 'Tailwind CSS',
	},
	{
		src: '/logos/motion.svg',
		alt: 'Framer Motion Logo',
		name: 'Framer Motion',
	},
];

const web3Tools = [
	{ src: '/logos/viem.png', alt: 'Viem Logo', name: 'Viem' },
	{ src: '/logos/wagmi.svg', alt: 'Wagmi Logo', name: 'Wagmi' },
	{ src: '/logos/rainbowkit.png', alt: 'Rainbowkit Logo', name: 'Rainbowkit' },
];

const design = [
	{ src: '/logos/figma.svg', alt: 'Figma Logo', name: 'Figma' },
	{ src: '/logos/framer.svg', alt: 'Framer Logo', name: 'Framer' },
];

const workflow = [
	{ src: '/logos/notion.svg', alt: 'Notion Logo', name: 'Notion' },
	{ src: '/logos/loom.svg', alt: 'Loom Logo', name: 'Loom' },
];

const noCode = [
	{ src: '/logos/framer.svg', alt: 'Framer Logo', name: 'Framer' },
];

const pageTransitionVariants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: -20,
	},
};

export default function About() {
	return (
		<motion.main
			className='p-4 flex flex-col justify-center items-start gap-12'
			variants={pageTransitionVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{ type: 'tween', duration: 0.3 }}>
			<section className='flex gap-8 py-4 flex-col items-star justify-center'>
				<h2 className='md:text-5xl text-4xl font-bold'>About Me</h2>

				<div className='flex flex-col items-start justify-center gap-12'>
					<p className='text-base leading-7 tracking-wide md:text-xl font-normal'>
						I&apos;m Gemini, a Web3 Designer and Front-End Developer based in
						Nigeria, specializing in creating clean, user-focused interfaces
						that drive adoption for decentralized projects. I partner with Web3
						startups, DeFi teams, NFT projects, and agencies to deliver products
						defined by clarity, speed, and minimalism. My goal is to make every
						decentralized interaction feel smooth, reliable, and premium. With
						over three years as both a builder and an active user in the Web3
						space, I possess a unique understanding of how people truly interact
						with decentralized applications. I operate with a proven
						design-first workflow, prioritizing calm, structured execution and
						clear communication. I ensure the user experience remains the
						central focus, delivering interfaces that are demonstrably simple,
						fast, and highly reliable. I am actively building towards becoming a
						Full-Stack Web3 Engineer and eventually launching my own studio
						dedicated to creating intuitive products that help make the world of
						Web3 easier and more accessible for everyone.
					</p>

					<Button>Get in touch</Button>
				</div>
			</section>
			<section>
				<h2 className=' text-[28px] md:text-5xl font-bold'>
					Skills & Tools I Work With
				</h2>
				<div>
					<TechStackSection
						heading='Core Front-end Stacks'
						icons={frontendStacks}
					/>
					<TechStackSection
						heading='Web3 Tools'
						icons={web3Tools}
					/>
					<TechStackSection
						heading='Product & Interface Design'
						icons={design}
					/>
					<TechStackSection
						heading='No-Code Execution'
						icons={noCode}
					/>
					<TechStackSection
						heading='Workflow'
						icons={workflow}
					/>
				</div>
			</section>
		</motion.main>
	);
}
