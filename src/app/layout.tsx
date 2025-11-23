import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/Components/Layout/Header';
import { Toaster } from 'react-hot-toast';

const plusJakarta = Plus_Jakarta_Sans({
	variable: '--font-plus-jakarta',
	subsets: ['latin'],
	display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
	display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

export const viewport: Viewport = {
	themeColor: '#0F0F0F',
};

export const metadata: Metadata = {
	// 2. Base Metadata
	metadataBase: new URL(baseUrl),
	title: {
		default: 'Gemini | Web3 Interface Designer & Developer',
		template: '%s | Gemini',
	},
	description:
		'Crafting clean, high-performing Web3 interfaces that feel simple, fast, and trustworthy. Expert in Next.js, React, and polished minimal design.',

	// 3. Search Engine Keywords
	keywords: [
		'Web3 Designer',
		'Frontend Developer',
		'Next.js Developer',
		'React Developer',
		'UI/UX Design',
		'Blockchain Interfaces',
		'dApp Design',
		'Minimalist Web Design',
		'Gemini Portfolio',
	],

	// 4. Authors & Creator
	authors: [{ name: 'Gemini', url: baseUrl }],
	creator: 'Gemini',

	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: baseUrl,
		title: 'Gemini | Web3 Interface Designer & Developer',
		description:
			'I craft clean, high-performing Web3 interfaces focused on clarity and performance.',
		siteName: 'Gemini Portfolio',
		images: [
			{
				url: '/GeminiPFP.png',
				width: 1200,
				height: 630,
				alt: 'Gemini - Web3 Interface Designer',
			},
		],
	},

	// 6. Twitter Card (X)
	twitter: {
		card: 'summary_large_image',
		title: 'Gemini | Web3 Interface Designer',
		description:
			'Crafting clean, high-performing Web3 interfaces that feel simple, fast, and trustworthy.',
		creator: '@0xgemini0',
	},

	// 7. Robots (Indexing)
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},

	// 8. Icons
	icons: {
		icon: '/icon.png',
		shortcut: '/icon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
			<body className='bg-bg-900 text-primary antialiased selection:bg-accent-500 selection:text-white'>
				<Header />
				{children}
				<Toaster position='top-right' />
			</body>
		</html>
	);
}
