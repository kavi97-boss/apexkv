import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { aboutGrid } from '@/data/data';
import Image from 'next/image';

function AboutSection() {
	return (
		<section id="about" className="relative px-4 pt-36">
			<h1 className="text-white text-4xl mb-10 font-bold">Wanna Know About Me?</h1>
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
			<div className="row-span-2 col-span-5 px-4 py-8 my-4 relative overflow-hidden rounded-3xl border border-white/[0.1] hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col">
				<div className="text-white flex flex-col sm:flex-row sm:items-center sm:space-x-4">
					<img
						src="/ApexKV-01.png"
						alt="Kavindu Harshitha, Full Stack Developer, specializing in Python, JavaScript, Django, and React"
						className="max-h-80 float-left sm:float-none sm:order-1 order-2 mx-auto sm:mx-0 mt-4 sm:mt-0"
					/>

					<div className="order-1 sm:order-2">
						<h2 className="text-4xl font-bold tracking-wider mb-10">I'm Kavindu Harshitha</h2>
						<p className="text-gray-500 mt-2 indent-20">
							Welcome to ApexKV.com. I'm a passionate Full Stack Developer with five years of experience in creating scalable, high-performance web applications. My
							journey in tech began as a self-taught programmer, driven by curiosity and a love for solving complex problems. Over the years, I've honed my skills in
							Python and JavaScript, specializing in frameworks like React and Django. My freelance work has given me the opportunity to collaborate with clients from
							diverse industries, delivering solutions that are not only functional but also tailored to meet their specific needs. I'm currently pursuing a degree in
							Software Engineering at the University of South Australia, where I continue to expand my knowledge and stay updated with the latest industry trends.
							When I'm not coding, you'll find me exploring the world through parkour and freerunning or photography. Let's connect and bring innovative ideas to life
							together.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AboutSection;
