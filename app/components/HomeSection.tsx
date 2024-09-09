import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';

import Spotlight from './ui/Spotlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';

function HomeSection() {
	return (
		<section id="home" className="max-w-7xl w-full h-screen flex flex-col justify-center">
			<div className="pb-20 pt-36 relative">
				<div>
					<Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
					<Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="magenta" />
					<Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="darkblue" />
				</div>

				<div
					className="h-screen w-full bg-black-100 bg-grid-white/[0.04]
       							absolute top-0 left-0 flex items-center justify-center"
				>
					<div
						className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100
        						 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
					/>
				</div>

				<div className="flex justify-center relative my-2 lg:my-20 md:my-20 z-10">
					<div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
						<TextGenerateEffect duration={1.5} words="Transforming Complex Ideas into Interactive Digital Experiences" />
						<p className="text-white text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
							Hi! I&apos;m Kavindu, a Full-Stack Developer based in Adelaide, Australia.
						</p>

						<a href="#about">
							<MagicButton title="Show my work" icon={<FaLocationArrow />} position="right" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomeSection;
