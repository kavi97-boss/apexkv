'use client';
import React from 'react';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Image from 'next/image';

function Home() {
	const navItems = [
		{
			Icon: <Image src={'/logo.png'} alt="ApexKV" width={40} height={40} className="mr-5" />,
			link: '/',
		},
		{
			name: 'About',
			link: '/#about',
		},
		{
			name: 'Projects',
			link: '/#projects',
		},
		{
			name: 'Contact',
			link: '/#contact',
		},
	];
	return (
		<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-x-hidden mx-auto sm;px-10 px-5">
			<div className="max-w-7xl w-full">
				<NavBar navItems={navItems} />
				<Hero />
				<div className="h-[1000px]"></div>
			</div>
		</main>
	);
}
export default Home;
