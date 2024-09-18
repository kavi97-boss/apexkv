'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const navItems = [
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

function NavBar() {
	const [activeLink, setActiveLink] = useState('');
	const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const [showNavItems, setShowNavItems] = useState<boolean>(false);

	const toggleNavBar = () => {
		setShowNavItems((prevState) => !prevState);
	};

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
		console.log(activeLink);
		if (activeLink && containerRef.current) {
			const activeElement = containerRef.current.querySelector(`[href='${activeLink}']`);
			if (activeElement) {
				const { offsetLeft, offsetWidth, offsetHeight } = activeElement as HTMLElement;
				const logoWidth = logoRef ? (logoRef.current ? logoRef.current.offsetWidth : 0) : 0;
				setUnderlineProps({ left: offsetLeft, width: offsetWidth, height: offsetHeight });
			}
		}
	}, [activeLink]);

	useEffect(() => {
		if (window.innerWidth > 768) {
			setShowNavItems(true);
		}
	}, []);

	return (
		<header className="fixed top-2 left-0 right-0 px-2 flex flex-row justify-center text-gray-600 z-[5000]">
			<nav className="nav-bar px-8 py-2 relative" ref={containerRef}>
				<a href="#home">
					<div className="flex items-center" ref={logoRef}>
						<img src="/logo.png" className="w-10 h-10" />
						<img src="/logo-text.png" className="max-h-7" />
					</div>
				</a>

				<div className="hidden md:block">
					{activeLink.length > 0 ? (
						<motion.div
							className="absolute bottom-0 top-1/2 border border-neutral-600 rounded-full -translate-y-1/2"
							initial={false}
							animate={{ left: underlineProps.left, width: underlineProps.width, height: underlineProps.height }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
							style={{ bottom: '-2px' }}
						/>
					) : (
						''
					)}
				</div>
				<ul className={`nav-items md:ml-4 ${showNavItems ? 'show-nav-items' : 'hide-nav-items'}`}>
					{navItems.map((navItem, idx) => (
						<a href={navItem.link} key={idx} className={`nav-item ${activeLink === navItem.link ? 'text-gray-200' : 'text-gray-600'}`}>
							<li>{navItem.name}</li>
						</a>
					))}
					<a href="/Kavindu-Harshitha-CV.pdf" download className="md:ml-4">
						<button className={`relative inline-flex w-36 overflow-hidden rounded-lg p-[1px] focus:outline-none`}>
							<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
							<span className="h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 py-2 px-4 text-sm font-medium text-white backdrop-blur-3xl">
								My Resume
							</span>
						</button>
					</a>
				</ul>
				<div className={`burger ${showNavItems ? 'active' : ''}`} onClick={toggleNavBar}>
					<div className="bar bar1" />
					<div className="bar bar2" />
					<div className="bar bar3" />
				</div>
			</nav>
		</header>
	);
}

export default NavBar;
