'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

function NavBar() {
	const [activeLink, setActiveLink] = useState('');
	const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	const navItems = [
		{
			Icon: <Image src={'/logo.png'} alt="ApexKV" width={40} height={40} className="mx-3" />,
			link: '#home',
		},
		{
			name: 'About',
			link: '#about',
		},
		{
			name: 'Projects',
			link: '#projects',
		},
		{
			name: 'Contact',
			link: '#contact',
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			let currentLink = '';

			navItems.forEach((item) => {
				const section: any = document.querySelector(item.link);
				if (section && section.offsetTop <= currentScroll + 10) {
					currentLink = item.link;
				}
			});

			setActiveLink(currentLink);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, [navItems]);

	useEffect(() => {
		if (activeLink && containerRef.current) {
			const activeElement = containerRef.current.querySelector(`[href='${activeLink}']`);
			if (activeElement) {
				const { offsetLeft, offsetWidth, offsetHeight } = activeElement as HTMLElement;
				setUnderlineProps({ left: offsetLeft, width: offsetWidth, height: offsetHeight });
			}
		}
	}, [activeLink]);
	return (
		<nav
			ref={containerRef}
			className={
				'flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 px-5 py-1 rounded-full border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-2 mx-auto'
			}
			style={{
				backdropFilter: 'blur(16px) saturate(180%)',
				backgroundColor: 'rgba(17, 25, 40, 0.75)',
				border: '1px solid rgba(255, 255, 255, 0.125)',
			}}
		>
			{activeLink !== navItems[0].link && (
				<motion.div
					className="absolute bottom-0 top-1/2 border border-neutral-600 rounded-full -translate-y-1/2"
					initial={false}
					animate={{ left: underlineProps.left, width: underlineProps.width, height: underlineProps.height }}
					transition={{ type: 'spring', stiffness: 500, damping: 30 }}
					style={{ bottom: '-2px' }}
				/>
			)}

			{navItems.map((navItem, idx) => (
				<Link key={`link=${idx}`} href={navItem.link}>
					<div
						className={cn(
							'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 border-black/.1 rounded-full p-2',
						)}
					>
						{navItem.Icon && <span className="block">{navItem.Icon}</span>}
						{navItem.name && <span className="text-sm cursor-pointer p-2">{navItem.name}</span>}
					</div>
				</Link>
			))}
		</nav>
	);
}

export default NavBar;
