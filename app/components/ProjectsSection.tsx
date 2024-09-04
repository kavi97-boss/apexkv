import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { projects } from '@/data/data';
import { PinContainer } from './ui/Pin';

function ProjectsSection() {
	return (
		<section id="projects" className="relative px-4 pt-36">
			<h1 className="text-white text-4xl mb-10 font-bold">Recent Projects</h1>
			<div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
				{projects.map((item) => (
					<div className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]" key={item.id}>
						<PinContainer title={item.label} href={item.link}>
							<div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
								<div className="relative w-full h-full overflow-hidden lg:rounded-3xl" style={{ backgroundColor: '#13162D' }}>
									<img src="/bg.png" alt="bgimg" />
								</div>
								<img src={item.img} alt="cover" className="z-10 absolute bottom-0" />
							</div>
							<h1 className="font-bold text-white lg:text-2xl md:text-xl text-base line-clamp-1">{item.title}</h1>
							<p
								className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
								style={{
									color: '#BEC1DD',
									margin: '1vh 0',
								}}
							>
								{item.des}
							</p>

							<div className="mt-7 mb-3">
								<div className="flex items-center w-3/4 flex-row flex-wrap h-auto">
									{item.iconLists1.map((icon, index) => (
										<div
											key={index}
											className="border border-white/[.2] rounded-full bg-slate-400 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
											style={{
												transform: `translateX(-${10 * index + 2}px)`,
											}}
										>
											<img
												src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-${icon === 'django' ? 'plain' : 'original'}.svg`}
												alt="icon5"
												className="p-2"
											/>
										</div>
									))}
									{item.iconLists2.length > 0 ? (
										<div className="flex items-center w-3/4 flex-row flex-wrap h-auto">
											{item.iconLists2.map((icon, index) => (
												<div
													key={index}
													className="border border-white/[.2] rounded-full bg-slate-400 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
													style={{
														transform: `translateX(-${10 * index + 2}px)`,
													}}
												>
													<img
														src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-${
															icon === 'django' ? 'plain' : 'original'
														}.svg`}
														alt="icon5"
														className="p-2"
													/>
												</div>
											))}
										</div>
									) : (
										''
									)}
								</div>

								<div className="flex justify-center items-center">
									<p className="flex lg:text-xl md:text-xs text-sm text-purple">Check Live Site</p>
									<FaLocationArrow className="ms-3" color="#CBACF9" />
								</div>
							</div>
						</PinContainer>
					</div>
				))}
			</div>
		</section>
	);
}

export default ProjectsSection;
