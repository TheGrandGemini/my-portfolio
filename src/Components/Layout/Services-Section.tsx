import ServiceCard from '../UI/ServiceCard';

const servicesData = [
	{
		imageSrc: '/design.png',
		imageAlt: 'Illustration of user experience design flow and strategy.',
		heading: 'Web3 Interface Design & Front-End Development',
		paragraph:
			'I design and build modern Web3 interfaces that are sleek, intuitive, and high-performing. From hand-coded React/Next.js projects to visually-built Framer landing pages, your product will feel smooth, reliable, and premium.',
	},
	{
		imageSrc: '/BlockChain.png',
		imageAlt:
			'Illustration of a smart contract icon linked to a crypto wallet.',
		heading: 'Blockchain Integration & Smart Contract Interaction',
		paragraph:
			'I seamlessly connect your front-end to wallets, smart contracts, and blockchain networks. Users experience secure, reliable interactions while maintaining a clean, polished interface.',
	},
	{
		imageSrc: '/prototype.png',
		imageAlt: 'Illustration of Prototype.',
		heading: 'Product Prototyping & Data Visualization',
		paragraph:
			'I build functional prototypes and dashboards that make complex on-chain data easy to understand. Your team can test, iterate, and visualize insights clearly without losing style or usability.',
	},
];

export default function ServicesSection() {
	return (
		<section className='flex flex-col items-start justify-center gap-12 md:gap-16'>
			{/* Section Header (Semantic H2) */}
			<div className='flex flex-col justify-center items-start gap-3 md:gap-4'>
				<h2 className='text-primary text-3xl md:text-5xl font-bold leading-tight'>
					What I Can Bring to Your Product or Organisation.
				</h2>
				<p className='text-muted font-normal md:text-xl text-lg max-w-3xl'>
					I build polished, high-performing Web3 interfaces through a focused
					and transparent process that keeps your product clear, stable, and
					ready to ship.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:p-5'>
				{servicesData.map((service, index) => (
					<ServiceCard
						key={index}
						imageSrc={service.imageSrc}
						imageAlt={service.imageAlt}
						heading={service.heading}
						paragraph={service.paragraph}
					/>
				))}
			</div>
		</section>
	);
}
