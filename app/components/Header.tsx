import Image from 'next/image';
import Link from 'next/link';

import logoImg from '../logo.png';
import logoTxt from '../logo-text.png';

const endpoints = [
	{
		to: '/about',
		label: 'ABOUT',
	},
	{
		to: '/blog',
		label: 'BLOG',
	},
	{
		to: '/portfolio',
		label: 'PORTFOLIO',
	},
	{
		to: '/contact',
		label: 'CONTACT',
	},
];

function Header() {
	return (
		<nav className="flex flex-row justify-center py-3">
			<div className="container flex flex-row justify-between items-center">
				<Link href={'/'}>
					<div className="flex flex-row items-center">
						<Image src={logoImg} alt="ApexKV" width={50} height={50} />
						<Image src={logoTxt} alt="ApexKV" height={25} />
					</div>
				</Link>
				<ul className="text-white flex flex-row">
					{endpoints.map((obj, indx) => (
						<Link href={obj.to} key={indx}>
							<li className="px-4 tracking-widest">{obj.label}</li>
						</Link>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Header;
