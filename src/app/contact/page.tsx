'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FiCheck,
	FiClock,
	FiShield,
	FiUserCheck,
	FiAlertCircle,
	FiLoader,
} from 'react-icons/fi';
import Button from '@/Components/UI/Button';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	details: z
		.string()
		.min(10, 'Please provide more details (min. 10 characters)'),
	services: z.array(z.string()).min(1, 'Select at least one service'),
	budget: z.string().min(1, 'Please select a budget'),
});

type FormData = z.infer<typeof formSchema>;

const EMAILJS_SERVICE_ID = 'service_x7vzz4p';
const EMAILJS_TEMPLATE_ID = 'template_yuo9nwn';
const EMAILJS_PUBLIC_KEY = '_5xpcGAJFFAqonUjo';

export default function ContactPage() {
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [selectedBudget, setSelectedBudget] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toast, setToast] = useState<{
		type: 'success' | 'error';
		message: string;
	} | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
		setValue,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			details: '',
			services: [],
			budget: '',
		},
	});

	useEffect(() => {
		setValue('services', selectedServices, { shouldValidate: true });
	}, [selectedServices, setValue]);

	useEffect(() => {
		setValue('budget', selectedBudget, { shouldValidate: true });
	}, [selectedBudget, setValue]);

	const services = [
		'UI/UX Design',
		'Frontend Development',
		'Smart Contract Integration',
		'Technical Audit',
		'Web3 Consulting',
		'Full-Stack DApp',
		'Backend API Development',
		'Performance Optimization',
	];

	const budgets = [
		{ label: 'Less than $500', value: '<500' },
		{ label: '$500 - $1,000', value: '500-1k' },
		{ label: 'More than $1,000', value: '>1k' },
	];

	const toggleService = (service: string) => {
		setSelectedServices((prev) =>
			prev.includes(service)
				? prev.filter((s) => s !== service)
				: [...prev, service]
		);
	};

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);

		try {
			const templateParams = {
				from_name: data.name,
				reply_to: data.email,
				name: data.name,
				email: data.email,
				services: selectedServices.join(', '),
				budget: budgets.find((b) => b.value === selectedBudget)?.label || '',
				details: data.details.replace(/\n/g, '<br>'),
				date: new Date().toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}),
				time: new Date().toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				title: 'New Project Inquiry',
			};

			await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				templateParams,
				EMAILJS_PUBLIC_KEY
			);

			setToast({
				type: 'success',
				message: 'Message sent! I’ll reply within 24 hours',
			});
			reset();
			setSelectedServices([]);
			setSelectedBudget('');
		} catch (err) {
			const error = err as { text?: string };
			console.error('EmailJS error:', err);
			setToast({
				type: 'error',
				message: error.text || 'Failed to send. Please email me directly.',
			});
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setToast(null), 6000);
		}
	};

	const formIsValid =
		isValid && selectedServices.length > 0 && selectedBudget !== '';

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -30 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='min-h-screen bg-bg-900 text-primary py-16 px-6 relative'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-12 items-start'>
						{/* Left Side */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.7 }}
							className='space-y-12'>
							<h1 className='text-5xl md:text-6xl font-bold leading-tight'>
								Tell me about your
								<span className='text-accent-500'> project</span>
							</h1>

							<div className='space-y-6'>
								<div className='flex items-center gap-4'>
									<div className='p-3 bg-accent-500/10 rounded-full'>
										<FiClock className='w-6 h-6 text-accent-500' />
									</div>
									<p className='text-lg text-secondary'>
										I’ll respond within{' '}
										<strong className='text-primary'>24 hours</strong>
									</p>
								</div>
								<div className='flex items-center gap-4'>
									<div className='p-3 bg-accent-500/10 rounded-full'>
										<FiShield className='w-6 h-6 text-accent-500' />
									</div>
									<p className='text-lg text-secondary'>
										NDA available upon request
									</p>
								</div>
								<div className='flex items-center gap-4'>
									<div className='p-3 bg-accent-500/10 rounded-full'>
										<FiUserCheck className='w-6 h-6 text-accent-500' />
									</div>
									<p className='text-lg text-secondary'>
										Direct access to me — no middlemen
									</p>
								</div>
							</div>

							<div className='pt-8'>
								<p className='text-muted mb-4'>Want to book an exact time?</p>
								<Button>Book a free call</Button>
							</div>
						</motion.div>

						{/* Right Side - Form */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.7 }}
							className='bg-bg-800 border border-border-stroke rounded-3xl p-8 md:p-12 shadow-2xl'>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='space-y-8'>
								{/* Services */}
								<div>
									<label className='block text-sm font-medium mb-4 text-secondary'>
										Services interested in
									</label>
									<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
										{services.map((service) => (
											<button
												key={service}
												type='button'
												onClick={() => toggleService(service)}
												className={`py-3 px-4 rounded-full border text-sm font-medium transition-all ${
													selectedServices.includes(service)
														? 'bg-accent-500 text-black border-accent-500'
														: 'bg-bg-700 text-secondary border-border-subtle hover:border-accent-500/50'
												}`}>
												{service}
											</button>
										))}
									</div>
									{errors.services && touchedFields.services && (
										<p className='text-red-400 text-sm mt-2'>
											{errors.services.message}
										</p>
									)}
								</div>

								{/* Budget */}
								<div>
									<label className='block text-sm font-medium mb-4 text-secondary'>
										Budget range
									</label>
									<div className='flex flex-wrap gap-3'>
										{budgets.map((budget) => (
											<button
												key={budget.value}
												type='button'
												onClick={() => setSelectedBudget(budget.value)}
												className={`py-3 px-6 rounded-full border text-sm font-medium transition-all ${
													selectedBudget === budget.value
														? 'bg-accent-500 text-black border-accent-500'
														: 'bg-bg-700 text-secondary border-border-subtle hover:border-accent-500/50'
												}`}>
												{budget.label}
											</button>
										))}
									</div>
									{errors.budget && touchedFields.budget && (
										<p className='text-red-400 text-sm mt-2'>
											{errors.budget.message}
										</p>
									)}
								</div>

								{/* Name & Email */}
								<div className='grid md:grid-cols-2 gap-6'>
									<div>
										<input
											{...register('name')}
											placeholder='Full name *'
											className='w-full px-5 py-4 bg-bg-700 border border-border-subtle rounded-xl text-primary placeholder:text-muted transition-all duration-200 focus:outline-none focus:border-accent-500 hover:border-accent-500/50'
										/>
										{errors.name && touchedFields.name && (
											<p className='text-red-400 text-sm mt-2'>
												{errors.name.message}
											</p>
										)}
									</div>
									<div>
										<input
											{...register('email')}
											type='email'
											placeholder='Email *'
											className='w-full px-5 py-4 bg-bg-700 border border-border-subtle rounded-xl text-primary placeholder:text-muted transition-all duration-200 focus:outline-none focus:border-accent-500 hover:border-accent-500/50'
										/>
										{errors.email && touchedFields.email && (
											<p className='text-red-400 text-sm mt-2'>
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								{/* Project Details */}
								<div>
									<textarea
										{...register('details')}
										rows={5}
										placeholder='Project details * (idea, goals, timeline...)'
										className='w-full px-5 py-4 bg-bg-700 border border-border-subtle rounded-xl text-primary placeholder:text-muted transition-all duration-200 focus:outline-none focus:border-accent-500 hover:border-accent-500/50 resize-none'
									/>
									{errors.details && touchedFields.details && (
										<p className='text-red-400 text-sm mt-2'>
											{errors.details.message}
										</p>
									)}
								</div>

								{/* Submit Button */}
								<button
									type='submit'
									disabled={!formIsValid || isSubmitting}
									className={`w-full py-5 font-semibold text-lg rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
										formIsValid && !isSubmitting
											? 'bg-accent-500 text-black hover:bg-accent-300 cursor-pointer'
											: 'bg-bg-700 text-muted cursor-not-allowed opacity-60'
									}`}>
									{isSubmitting ? (
										<>
											<FiLoader className='w-5 h-5 animate-spin' />
											Sending...
										</>
									) : (
										'Submit inquiry'
									)}
								</button>
							</form>
						</motion.div>
					</div>
				</div>

				{/* Toast */}
				<AnimatePresence>
					{toast && (
						<motion.div
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -30, scale: 0.9 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
							className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50'>
							<div
								className={`bg-bg-800 border rounded-2xl px-8 py-5 shadow-2xl flex items-center gap-4 backdrop-blur-xl ${
									toast.type === 'success'
										? 'border-accent-500/50'
										: 'border-red-500/50'
								}`}>
								<div
									className={`p-3 rounded-full ${
										toast.type === 'success'
											? 'bg-accent-500/20'
											: 'bg-red-500/20'
									}`}>
									{toast.type === 'success' ? (
										<FiCheck className='w-6 h-6 text-accent-500' />
									) : (
										<FiAlertCircle className='w-6 h-6 text-red-400' />
									)}
								</div>
								<div>
									<p className='text-primary font-medium'>
										{toast.type === 'success'
											? 'Message sent!'
											: 'Submission failed'}
									</p>
									<p className='text-sm text-muted'>{toast.message}</p>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
}
