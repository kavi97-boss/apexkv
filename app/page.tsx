'use client';
import React from 'react';

import NavBar from './components/NavBar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';

function Home() {
	return (
		<main className="relative bg-black-100 flex justify-center items-center flex-col overflow-x-hidden">
			<div className="max-w-[1280px]">
				<NavBar />
				<HomeSection />
				<AboutSection />
				<ProjectsSection />
				<ContactSection />
			</div>
			<Footer />
		</main>
	);
}
export default Home;
