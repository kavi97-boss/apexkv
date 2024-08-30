import Image from 'next/image';
import React from 'react';

function Home() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<Image src={'/logo.png'} alt="ApexKV Logo" width={150} height={150} />
			<Image src={'/logo-text.png'} alt="ApexKV Logo Text" className="w-3/4 sm:w-4/5" style={{ width: '70vw' }} />
			<h1 className="text-5xl font-bold text-white">Site on Under Construction</h1>
		</div>
	);
}
export default Home;
