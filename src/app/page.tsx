'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/Components/UI/Button';
import Typewriter from 'typewriter-effect';
import ServicesSection from '@/Components/Layout/Services-Section';
import { motion, Transition } from 'framer-motion';

const socialLinks = [
	{
		name: 'Twitter',
		path: '/social-icons/twitter.svg',
		url: 'https://x.com/0xGemini0',
	},
	{
		name: 'Telegram',
		path: '/social-icons/telegram.svg',
		url: 'https://t.me/Thegrandgemini',
	},
	{
		name: 'Discord',
		path: '/social-icons/discord.svg',
		url: 'https://discord.com/users/888758551017828402',
	},
	{
		name: 'GitHub',
		path: '/social-icons/github.svg',
		url: 'https://github.com/TheGrandGemini',
	},
	{
		name: 'LinkedIn',
		path: '/social-icons/linkedin.svg',
		url: 'https://www.linkedin.com/in/the-grand-gemini-20a19827b/',
	},
	{
		name: 'Dribble',
		path: '/social-icons/dribble.svg',
		url: 'https://dribbble.com/the-grand-gemini',
	},
];

const pageVariants = {
	initial: {
		opacity: 0,
		x: -200,
		scale: 0.8,
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1,
	},
	out: {
		opacity: 0,
		x: 200,
		scale: 0.8,
	},
};

const pageTransition: Transition = {
	type: 'tween',
	ease: 'easeOut',
	duration: 0.5,
};

export default function Home() {
	const [typingStep, setTypingStep] = useState(0);

	return (
		<motion.main
			className='p-4 md:px-14 flex flex-col justify-between items-start gap-20'
			variants={pageVariants}
			initial='initial'
			animate='in'
			exit='out'
			transition={pageTransition}>
			<style
				jsx
				global>{`
				.gradient-text-cursor .Typewriter__cursor {
					color: #f0ede5 !important;
				}
				.hide-cursor .Typewriter__cursor {
					display: none !important;
					opacity: 0 !important;
				}
			`}</style>

			<section className='flex flex-col justify-center items-start gap-5 max-w-5xl'>
				<div className='relative'>
					<Image
						src={'/GeminiPFP.png'}
						alt='Gemini Profile pic'
						width={200}
						height={200}
						priority
						className='w-24 h-24 md:w-[200px] md:h-[200px] rounded-full object-cover shadow-lg'
					/>
				</div>

				<div className='flex flex-col gap-2 items-start w-full min-h-[200px]'>
					<p
						className={`text-muted font-medium md:text-4xl text-[20px] ${
							typingStep > 0 ? 'hide-cursor' : ''
						}`}>
						<Typewriter
							onInit={(typewriter) => {
								typewriter
									.typeString('Hi there,')
									.callFunction(() => setTypingStep(1))
									.start();
							}}
							options={{ delay: 50, cursor: '|' }}
						/>
					</p>

					{typingStep >= 1 && (
						<h1
							className={`gradient-text-cursor md:text-5xl font-bold bg-linear-to-r from-[#F0EDE5] to-[rgba(113,109,103,0.7)] bg-clip-text text-transparent text-[28px] leading-tight ${
								typingStep > 1 ? 'hide-cursor' : ''
							}`}>
							<Typewriter
								onInit={(typewriter) => {
									typewriter
										.typeString(
											'I’m Gemini, I Design & Build Modern Web3 Interfaces'
										)
										.callFunction(() => setTypingStep(2))
										.start();
								}}
								options={{ delay: 40, cursor: '|' }}
							/>
						</h1>
					)}

					{typingStep >= 2 && (
						<p
							className={`text-primary text-[14px] md:text-[20px] font-normal leading-relaxed max-w-3xl ${
								typingStep > 2 ? 'hide-cursor' : ''
							}`}>
							<Typewriter
								onInit={(typewriter) => {
									typewriter
										.typeString(
											'I craft clean, high-performing Web3 interfaces that feel simple, fast, and trustworthy. My approach blends strong visual structure with polished, minimal design.'
										)
										.callFunction(() => setTypingStep(3))
										.start();
								}}
								options={{ delay: 20, cursor: '|' }}
							/>
						</p>
					)}
				</div>

				<div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 w-full'>
					<ul
						className='flex items-center gap-4 md:gap-6 list-none p-0 m-0'
						aria-label='Social Media Links'>
						{socialLinks.map((social) => (
							<li key={social.name}>
								<Link
									href={social.url}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={`Visit my ${social.name} profile`}
									className='block transition-transform hover:scale-110 hover:opacity-80 active:scale-95'>
									<Image
										src={social.path}
										alt={`${social.name} icon`}
										width={48}
										height={48}
										className='w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12'
									/>
								</Link>
							</li>
						))}
					</ul>

					<Button
						size='md'
						className='w-full sm:w-auto'>
						Get in touch
					</Button>
				</div>
			</section>
			<ServicesSection />
		</motion.main>
	);
}
