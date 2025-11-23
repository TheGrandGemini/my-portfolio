'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../UI/Button';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const normalizedPath =
		pathname === '/' ? '/' : pathname.replace(/\/$/, '').toLowerCase();

	const navItems = ['Home', 'About', 'Projects', 'Contact'];

	const checkActive = (item: string) => {
		const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
		return { href, isActive: normalizedPath === href };
	};

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<style
				jsx
				global>{`
				.glassy-background {
					background-color: rgba(
						5,
						5,
						5,
						0.7
					); /* Adjust alpha for desired transparency */
					backdrop-filter: blur(10px); /* Adjust blur amount */
					-webkit-backdrop-filter: blur(10px); /* For Safari support */
				}
				.mobile-menu-glassy {
					background-color: rgba(
						5,
						5,
						5,
						0.9
					); /* Slightly less transparent for mobile menu */
					backdrop-filter: blur(15px);
					-webkit-backdrop-filter: blur(15px);
				}
			`}</style>

			{/* --- Main Header --- */}
			<header
				className={`
                    z-50 sticky top-0 w-full flex items-center justify-between md:justify-center gap-4 md:gap-32 py-4 px-6 md:pl-64 md:pr-16 transition-all duration-300 ease-in-out
                    ${
											isScrolled
												? 'glassy-background shadow-lg'
												: 'bg-transparent'
										}
                `}>
				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsOpen(true)}
					className='block md:hidden text-secondary p-2'
					aria-label='Open Menu'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-8 h-8'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</button>

				{/* DESKTOP: Nav (Hidden on Mobile) */}
				<nav
					className={`
                        hidden md:flex rounded-2xl justify-center items-center gap-[109px] py-3 px-7
                        ${isScrolled ? 'bg-transparent' : 'bg-bg-700'}
                    `}>
					{navItems.map((item) => {
						const { href, isActive } = checkActive(item);
						return (
							<motion.div
								key={item}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}>
								<Link
									href={href}
									className={`${
										isActive
											? 'text-muted font-bold'
											: 'text-secondary font-semibold text-base'
									}`}>
									{item}
								</Link>
							</motion.div>
						);
					})}
				</nav>

				<Button size={'sm'}>Get in touch</Button>
			</header>

			{/* --- MOBILE MODAL OVERLAY --- */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 mobile-menu-glassy'>
						{/* Close Button */}
						<button
							onClick={() => setIsOpen(false)}
							className='absolute top-6 right-6 text-secondary p-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-10 h-10'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>

						{/* Mobile Nav Items */}
						<nav className='flex flex-col items-center gap-8'>
							{navItems.map((item) => {
								const { href, isActive } = checkActive(item);
								return (
									<motion.div
										key={item}
										whileTap={{ scale: 0.9 }}>
										<Link
											href={href}
											onClick={() => setIsOpen(false)}
											className={`text-2xl ${
												isActive
													? 'text-muted font-bold'
													: 'text-secondary font-medium'
											}`}>
											{item}
										</Link>
									</motion.div>
								);
							})}
						</nav>

						<div onClick={() => setIsOpen(false)}>
							<Button>Get in touch</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
