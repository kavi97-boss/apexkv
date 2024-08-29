import Image from 'next/image';
import React from 'react';
import logo from '@/app/logo.png';
import logoTxt from '@/app/logo-text.png';

function Home() {
	return (
		<div className="w-full flex flex-col">
			<Image src={logo} alt="ApexKV Logo" width={100} height={100} />
			<Image src={logoTxt} alt="ApexKV Logo Text" style={{ width: '90vw' }} />
			<h1 className="text-6xl font-bold text-white">Page on Under Construction</h1>
		</div>
	);
}
export default Home;
