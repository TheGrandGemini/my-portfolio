'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import ProjectCard from './components/Project-card';
import { projectData } from './lib/projectData';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { motion, useInView } from 'framer-motion';
import TestimonySection from './components/TestimonySection';

export default function Projects() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	const getScrollAmountAndIndex = useCallback(() => {
		if (!scrollContainerRef.current)
			return { cardWidth: 0, scrollStep: 0, newIndex: 0 };

		const container = scrollContainerRef.current;
		const firstCard = container.children[0] as HTMLElement;
		const cardWidth = firstCard?.offsetWidth || 0;

		let scrollStep;
		if (window.innerWidth < 768) {
			// Mobile breakpoint
			const cardWithMargin = cardWidth + 32;
			scrollStep = cardWithMargin;
		} else {
			// Desktop
			scrollStep = cardWidth + 32;
		}
		const newIndex = Math.round(container.scrollLeft / scrollStep);
		return { cardWidth, scrollStep, newIndex };
	}, []);

	const updateCarouselState = useCallback(() => {
		if (!scrollContainerRef.current) return;

		const container = scrollContainerRef.current;
		const { scrollLeft, scrollWidth, clientWidth } = container;
		const { newIndex } = getScrollAmountAndIndex();

		setCurrentCardIndex(newIndex);
		setCanScrollPrev(scrollLeft > 0);
		setCanScrollNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
	}, [getScrollAmountAndIndex]);

	useLayoutEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			updateCarouselState();
			scrollContainer.addEventListener('scroll', updateCarouselState, {
				passive: true,
			});
			window.addEventListener('resize', updateCarouselState, { passive: true });

			return () => {
				scrollContainer.removeEventListener('scroll', updateCarouselState);
				window.removeEventListener('resize', updateCarouselState);
			};
		}
	}, [updateCarouselState]);

	const scrollToNextPrev = (direction: 'next' | 'prev') => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const { scrollStep } = getScrollAmountAndIndex();

			let targetScrollLeft = container.scrollLeft;

			if (direction === 'next') {
				targetScrollLeft = Math.min(
					container.scrollLeft + scrollStep,
					container.scrollWidth - container.clientWidth
				);
			} else {
				targetScrollLeft = Math.max(container.scrollLeft - scrollStep, 0);
			}

			container.scrollTo({
				left: targetScrollLeft,
				behavior: 'smooth',
			});
		}
	};

	return (
		<main className='p-4 md:p-8 flex flex-col justify-center items-center md:items-start gap-12 max-w-full overflow-hidden'>
			<motion.section
				ref={sectionRef}
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.8, delay: 0.2 }}
				className='flex gap-8 py-4 flex-col items-center md:items-start justify-center w-full'>
				{/* Heading and Description */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.4 }}>
					<h2 className='md:text-5xl text-4xl font-bold text-primary'>
						Selected Work
					</h2>
					<p className='text-muted text-sm md:text-xl font-normal leading-relaxed max-w-3xl'>
						A curated selection of Web3 interfaces I’ve designed and built.
					</p>
				</motion.div>

				<div className='flex gap-8 py-4 flex-col items-center justify-center w-full'>
					{/* Projects Carousel Container */}
					<div className='relative w-full max-w-7xl mx-auto'>
						{/* Scrollable Cards */}
						<div
							ref={scrollContainerRef}
							className='flex overflow-x-scroll no-scrollbar snap-x snap-mandatory py-4'
							onScroll={updateCarouselState}>
							{projectData.map((project, index) => (
								<motion.div
									key={project.id}
									className='snap-start'
									initial={{ opacity: 0, y: 100 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}>
									<ProjectCard {...project} />
								</motion.div>
							))}
						</div>

						{/* Navigation Buttons */}
						{canScrollPrev && (
							<motion.button
								onClick={() => scrollToNextPrev('prev')}
								className='absolute left-0 top-1/2 -translate-y-1/2 bg-bg-900 bg-opacity-70 text-white p-3 rounded-full shadow-lg z-10'
								aria-label='Previous Project'
								whileHover={{
									scale: 1.1,
									backgroundColor: 'rgba(29, 29, 34, 0.9)',
								}}
								whileTap={{ scale: 0.95 }}
								initial={{ opacity: 0, x: -20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.3, delay: 0.8 }}>
								<BiChevronLeft className='text-3xl' />
							</motion.button>
						)}
						{canScrollNext && (
							<motion.button
								onClick={() => scrollToNextPrev('next')}
								className='absolute right-0 top-1/2 -translate-y-1/2 bg-bg-900 bg-opacity-70 text-white p-3 rounded-full shadow-lg z-10'
								aria-label='Next Project'
								whileHover={{
									scale: 1.1,
									backgroundColor: 'rgba(29, 29, 34, 0.9)',
								}}
								whileTap={{ scale: 0.95 }}
								initial={{ opacity: 0, x: 20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.3, delay: 0.8 }}>
								<BiChevronRight className='text-3xl' />
							</motion.button>
						)}
					</div>

					{/* Indicators (Dots) */}
					<motion.div
						className='flex justify-center mt-8 space-x-3'
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.9 }}>
						{projectData.map((_, index: number) => (
							<motion.button
								key={index}
								onClick={() => {
									if (scrollContainerRef.current) {
										const { scrollStep } = getScrollAmountAndIndex();
										scrollContainerRef.current.scrollTo({
											left: index * scrollStep,
											behavior: 'smooth',
										});
									}
								}}
								className={`w-3 h-3 rounded-full transition-colors duration-300 ${
									index === currentCardIndex ? 'bg-primary' : 'bg-low'
								}`}
								aria-label={`Go to project ${index + 1}`}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							/>
						))}
					</motion.div>
				</div>
			</motion.section>
			<TestimonySection />
		</main>
	);
}
