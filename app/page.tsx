'use client';
import React from 'react';
import Image from 'next/image';
import { IconArrowWaveRightUp, IconBoxAlignRightFilled, IconBoxAlignTopLeft, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from '@tabler/icons-react';

import NavBar from './components/NavBar';
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid';
import { aboutGrid } from '@/data/data';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';

function Home() {
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

	return (
		<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-x-hidden">
			<div className="max-w-[1200px]">
				<NavBar navItems={navItems} />
				<HomeSection />
				<AboutSection />
				<section id="projects" className="relative">
					<div className="h-[1000px]"></div>
				</section>
				<section id="contact" className="relative">
					<div className="h-[1000px]"></div>
				</section>
			</div>
		</main>
	);
}
export default Home;
