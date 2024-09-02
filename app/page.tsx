'use client';
import React from 'react';
import Image from 'next/image';
import { IconArrowWaveRightUp, IconBoxAlignRightFilled, IconBoxAlignTopLeft, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from '@tabler/icons-react';

import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid';
import { aboutGrid } from '@/data/data';

const Skeleton = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
	{
		title: 'The Dawn of Innovation',
		description: 'Explore the birth of groundbreaking ideas and inventions.',
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'The Digital Revolution',
		description: 'Dive into the transformative power of technology.',
		header: <Skeleton />,
		icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'The Art of Design',
		description: 'Discover the beauty of thoughtful and functional design.',
		header: <Skeleton />,
		icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'The Power of Communication',
		description: 'Understand the impact of effective communication in our lives.',
		header: <Skeleton />,
		icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'The Pursuit of Knowledge',
		description: 'Join the quest for understanding and enlightenment.',
		header: <Skeleton />,
		icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: 'The Joy of Creation',
		description: 'Experience the thrill of bringing ideas to life.',
		header: <Skeleton />,
		icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
	},
];

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
		<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-x-hidden mx-auto sm;px-10 px-5">
			<NavBar navItems={navItems} />
			<section id="home" className="max-w-7xl w-full">
				<Hero />
			</section>
			<section id="about" className="relative container">
				<h1 className="text-white text-4xl mb-10 mt-36 font-bold">Wanna Know About Me?</h1>
				<BentoGrid className="w-full">
					{aboutGrid.map((item, i) => (
						<BentoGridItem
							id={item.id}
							key={i}
							title={item.title}
							description={item.description}
							className={item.className}
							img={item.img}
							imgClassName={item.imgClassName}
							titleClassName={item.titleClassName}
							spareImg={item.spareImg}
						/>
					))}
				</BentoGrid>
				<div className="row-span-2 col-span-5 p-5 my-4 relative overflow-hidden rounded-3xl border border-white/[0.1] hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col">
					<h1 className="text-white text-3xl">Kavindu Harshitha</h1>
				</div>
			</section>
			<section id="projects" className="relative">
				<div className="h-[1000px]"></div>
			</section>
			<section id="contact" className="relative">
				<div className="h-[1000px]"></div>
			</section>
		</main>
	);
}
export default Home;
