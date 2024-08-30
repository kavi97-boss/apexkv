import Image from 'next/image';
import React from 'react';

function Home() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<Image src={'/logo.png'} alt="ApexKV Logo" width={100} height={100} />
			<Image src={'/logo-text.png'} alt="ApexKV Logo Text" style={{ width: '90vw' }} />
			<h1 className="text-6xl font-bold text-white">Page on Under Construction</h1>
		</div>
	);
}
export default Home;
