'use client';

import { useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';
import { PopupModal } from 'react-calendly';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
	'rounded-xl font-medium transition-colors focus:outline-none select-none font-semibold',
	{
		variants: {
			size: {
				sm: 'px-4 py-2 text-sm',
				md: 'px-6 py-3 text-base',
				lg: 'px-8 py-4 text-lg',
			},
			variant: {
				primary: 'bg-accent-500 text-primary hover:bg-bg-500',
				secondary: 'bg-bg-700 text-primary',
				ghost: 'bg-transparent text-primary',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'primary',
		},
	}
);

interface ButtonProps
	extends HTMLMotionProps<'button'>,
		VariantProps<typeof buttonStyles> {
	children: React.ReactNode;
	calendlyUrl?: string;
}

export default function Button({
	size,
	variant,
	className,
	children,
	calendlyUrl = 'https://calendly.com/thegrandgemini/30min',
	...props
}: ButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setRootElement(document.getElementById('root') || document.body);
	}, []);

	const handleClick = () => {
		if (calendlyUrl) {
			setIsOpen(true);
		}
	};

	return (
		<>
			<motion.button
				whileHover={{ scale: 1.06 }}
				whileTap={{ scale: 0.94 }}
				transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				className={cn(buttonStyles({ size, variant }), className)}
				onClick={handleClick}
				{...props}>
				{children}
			</motion.button>

			{calendlyUrl && rootElement && (
				<PopupModal
					url={calendlyUrl}
					onModalClose={() => setIsOpen(false)}
					open={isOpen}
					rootElement={rootElement}
				/>
			)}
		</>
	);
}
