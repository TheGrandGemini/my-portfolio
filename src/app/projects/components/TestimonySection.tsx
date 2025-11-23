'use client';
import TestimonyCard from './TestimonyCard';

export default function TestimonySection() {
	return (
		<section className='py-4 flex flex-col justify-center items-start gap-14'>
			<div>
				<h2 className='md:text-5xl text-4xl font-bold text-primary'>
					What Clients Say About Working With Me
				</h2>
				<p className='text-muted text-sm md:text-xl font-normal leading-relaxed max-w-3xl'>
					Real stories from the people I&apos;ve collaborated with to bring
					their Web3 projects and ideas to life.
				</p>
			</div>

			<div className='flex flex-wrap justify-between items-center gap-12'>
				<TestimonyCard
					rating={5}
					text='You absolutely killed it. Clean, modern, fast, and exactly what I wanted. Everything works perfectly.'
					authorName='GreatSadiq'
					authorPosition='CEO'
					authorAvatar='/testimony/greatsadiq.jpg'
				/>
				<TestimonyCard
					rating={5}
					text='I like how you redesigned the landing page. Clean, clear, and a big step up. Good job.'
					authorName='Being AI'
					authorPosition='CEO'
					authorAvatar='/testimony/beingAi.svg'
				/>
				{/* <TestimonyCard
					rating={5}
					text='I like how you redesigned the landing page. Clean, clear, and a big step up. Good job.'
					authorName='GreatSadiq'
					authorPosition='CEO'
					authorAvatar='/testimony/beingAi.svg'
				/> */}
			</div>
		</section>
	);
}
