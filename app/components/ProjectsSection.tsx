import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { projects } from '@/data/data';

function ProjectsSection() {
	return (
		<section id="projects" className="relative px-4 pt-36">
			<h1 className="text-white text-4xl mb-10 font-bold">Recent Projects</h1>
			<div className="flex flex-wrap p-4 mt-10 w-full" style={{ perspective: 1200 }}>
				{projects.map((item, index) => (
					<div key={index} className="lg:w-1/3 md:w-1/2 sm:w-full p-2 card-hover">
						<div className="relative border border-white/[0.1] flex flex-col justify-center rounded-xl overflow-hidden p-4">
							<div className="relative w-full h-full overflow-hidden rounded-xl" style={{ backgroundColor: '#13162D' }}>
								<img src="/bg.png" alt="bgimg" />
								<img src={item.img} alt="cover" className="z-10 absolute -bottom-10 right-0 scale-90" />
							</div>
							<h1 className="text-white text-xl font-semibold my-2 line-clamp-2">{item.title}</h1>
							<p className="text-neutral-500 line-clamp-3">{item.des}</p>
							<div className="flex flex-row flex-wrap mt-2 justify-start z-20">
								{item.iconLists1.map((icon, indx) => (
									<span
										key={indx}
										className="!w-10 !h-10 bg-slate-600 rounded-full shadow-xl"
										style={{
											transform: `translateX(-${10 * indx + 2}px)`,
										}}
									>
										<img
											src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-${icon === 'django' ? 'plain' : 'original'}.svg`}
											alt="icon5"
											className="p-2"
										/>
									</span>
								))}
							</div>
							<div className="flex flex-row flex-wrap justify-start -translate-y-3 z-10">
								{item.iconLists2.length === 0 && <span className="h-10" />}
								{item.iconLists2.map((icon, indx) => (
									<span
										key={indx}
										className="!w-10 !h-10 bg-slate-600 rounded-full shadow-xl"
										style={{
											transform: `translateX(-${10 * indx + 2}px)`,
										}}
									>
										<img
											src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-${icon === 'django' ? 'plain' : 'original'}.svg`}
											alt="icon5"
											className="p-2"
										/>
									</span>
								))}
							</div>
							<div className="wi-full flex flex-row justify-center">
								<a href={item.link} className="w-fit py-2 px-4 mt-4 rounded-full border border-[#CBACF9] text-[#CBACF9] flex items-center">
									Check About Project
									<FaLocationArrow className="ms-3" color="#CBACF9" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default ProjectsSection;
