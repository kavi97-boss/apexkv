'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function NavBar() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => setIsNavOpen(!isNavOpen);

	return (
		<header className="fixed z-[5000] top-2 left-1 right-1 flex flex-row justify-center">
			<div
				className="px-10 shadow-lg rounded-[5vh] md:max-w-fit w-full"
				style={{
					backdropFilter: 'blur(16px) saturate(180%)',
					backgroundColor: 'rgba(17, 25, 40, 0.75)',
					border: '1px solid rgba(255, 255, 255, 0.125)',
				}}
			>
				<div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
					<a className="flex items-center text-2xl font-black" href="#home">
						<div className="flex flex-row items-center !pr-4">
							<Image src={'/logo.png'} alt="ApexKV" width={40} height={40} className="mx-3" />
							<img src={'/logo-text.png'} alt="ApexKV" className="mx-3 !w-48" />
						</div>
					</a>
					<input className="peer hidden" type="checkbox" id="navbar-open" checked={isNavOpen} onChange={toggleNav} />
					<label className="absolute top-5 right-0 mt-1 cursor-pointer text-xl md:hidden" onClick={toggleNav}>
						{/* Burger/Cross Icon */}
						<div className="flex flex-col">
							<motion.div className="w-10 h-[4px] bg-neutral-400" animate={isNavOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
							<motion.div className="w-10 h-[4px] bg-neutral-400 my-[5px]" animate={isNavOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.3 }} />
							<motion.div className="w-10 h-[4px] bg-neutral-400" animate={isNavOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
						</div>
					</label>
					<motion.nav
						aria-label="ApexKV Navigation"
						className={`pl-2 sm:pl-0 ${isNavOpen ? 'py-6' : 'py-0'} sm:block sm:py-0 overflow-hidden`}
						initial={isNavOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
						animate={isNavOpen || window.innerWidth >= 768 ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						style={{ overflow: isNavOpen || window.innerWidth >= 768 ? 'visible' : 'hidden' }}
					>
						<ul className="flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-8 md:flex-row md:gap-x-8">
							<li className="">
								<a className={`text-gray-600 hover:text-gray-200`} href="#about">
									About
								</a>
							</li>
							<li className="">
								<a className={`text-gray-600 hover:text-gray-200`} href="#projects">
									Projects
								</a>
							</li>
							<li className="">
								<a className={`text-gray-600 hover:text-gray-200`} href="#contact">
									Contact
								</a>
							</li>
							<li className="mt-2 sm:mt-0">
								<a href="/Kavindu-Harshitha-CV.pdf" download>
									<button className={`relative inline-flex w-full overflow-hidden rounded-lg p-[1px] focus:outline-none`}>
										<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
										<span
											className={`h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-slate-950 py-2 px-4 text-sm font-medium text-white backdrop-blur-3xl`}
										>
											My Resume
										</span>
									</button>
								</a>
							</li>
						</ul>
					</motion.nav>
				</div>
			</div>
		</header>
	);
}

export default NavBar;
