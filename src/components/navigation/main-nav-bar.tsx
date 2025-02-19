'use client';
import {
	Bell,
	User2,
	Mails,
	Package,
	Settings,
	Megaphone,
	LogOutIcon,
	ShoppingCartIcon,
} from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {NavLinks} from '@/data';
import {Button} from '../ui/button';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';

const MainNavbar = () => {
	const router = useRouter();

	const {user, updateUser, updateCurrentAccountTab} = useGlobalStore();

	const [scrolling, setScrolling] = useState<boolean>(false);
	const [showMenu, setSetshowMenu] = useState<boolean>(false);
	const [showAccountMenu, setSetShowAccountMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setSetshowMenu(!showMenu);
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const scrollPosition = window.scrollY;

			if (scrollPosition > 50) {
				setScrolling(true);
				// console.log('[SCROLLING]');
			} else {
				setScrolling(false);
				// console.log('[FALSE]');
			}
		});
	}, []);

	return (
		<div className='relative'>
			<nav
				className={`w-full py-2 px-8 hidden fixed z-10 sm:flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
				}`}
			>
				<Link href={'/'}>
					<Image
						alt='logo'
						width={40}
						height={40}
						className=''
						src={'/logo.svg'}
					/>
				</Link>

				<div className='flex items-center gap-x-8'>
					{NavLinks.map((link) => (
						<Link
							href={link.url}
							key={link.title}
							className={`text-sm ${
								scrolling ? 'text-white' : 'text-white'
							}`}
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='flex items-center space-x-5'>
					<Link
						href={'#'}
						className={`h-10 w-10 ${
							scrolling ? 'bg-white' : 'bg-main'
						} rounded-full flex flex-col items-center justify-center`}
					>
						{/* <Image
							width={20}
							height={20}
							alt='Livestocx Carrier'
							src='/icon__carrier.svg'
						/> */}
						<ShoppingCartIcon
							className={`h-5 w-5 ${
								scrolling ? 'text-main' : 'text-white'
							}`}
						/>
					</Link>
					<div
						// href={user ? '/account' : '/signin'}
						onClick={() => {
							if (!user) {
								router.push(`${!user && '/signin'}/`);
							} else {
								setSetShowAccountMenu(!showAccountMenu);
							}
						}}
						className={`h-10 w-10 ${
							scrolling ? 'bg-white' : 'bg-main'
						} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
					>
						<User2
							className={`h-5 w-5 ${
								scrolling
									? 'text-main'
									: 'text-white cursor-pointer'
							}`}
						/>

						{showAccountMenu && (
							<div
								onMouseLeave={() =>
									setSetShowAccountMenu(false)
								}
								className='absolute right-0 top-12 w-[200px] rounded shadow-md bg-white flex flex-col space-y-6 items-start px-4 py-5'
							>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Account');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<User2 className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Account</p>
								</Link>
								{user?.role === 'CUSTOMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											router.push('/account');

											updateCurrentAccountTab(
												'Desired Items'
											);
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<ShoppingCartIcon
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Desired Items</p>
									</Link>
								)}
								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab('Products');
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Package
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Products</p>
									</Link>
								)}
								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab(
												'Advertise'
											);
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Megaphone
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Advertise</p>
									</Link>
								)}
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Messages');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Mails className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Messages</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab(
											'Notifications'
										);
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Bell className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Notifications</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Settings');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Settings className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Settings</p>
								</Link>
								<p
									// href={'#'}
									onClick={async () => {
										try {
											await axios.get(
												'/api/auth/signout'
											);

											toast.success('Logged out!');

											updateUser(null);
											setSetShowAccountMenu(false);

											router.push('/');

											// window.location.reload();
										} catch (error) {
											console.log(
												'[LOGOUT-ERROR] :: ',
												error
											);

											toast.error('Error!');
										}
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} pt-10 rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in cursor-pointer`}
								>
									<LogOutIcon
										className={`h-5 w-5 text-red-500`}
									/>

									<p className='text-xs text-red-500'>
										Logout
									</p>
								</p>
							</div>
						)}
					</div>
					{/* <Link
						href={user ? '/account' : '/signin'}
						className={`h-10 w-10 ${
							scrolling ? 'bg-white' : 'bg-main'
						} rounded-full flex flex-col items-center justify-center`}
					>
						<User2
							className={`h-5 w-5 ${
								scrolling ? 'text-main' : 'text-white'
							}`}
						/>
					</Link> */}
				</div>
			</nav>

			{/* MOBILE TOGGLEBAR */}
			<div
				className={`w-full py-4 px-4 pl-1 sm:pl-8 sm:px-8 sm:hidden fixed z-10 flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
				}`}
			>
				<Button
					type='button'
					variant={'default'}
					className={`font-bold bg-[#0000000] hover:bg-[#0000000]`}
					onClick={toggleMenu}
				>
					<Image
						alt='menu_icon'
						width={30}
						height={30}
						src={`${
							!scrolling
								? '/icon_menu.svg'
								: '/icon_menu_white.svg'
						}`}
					/>
				</Button>

				<div className='flex items-center space-x-5'>
					<Link
						href={'#'}
						className={`h-10 w-10 ${
							scrolling ? 'bg-white' : 'bg-main'
						} rounded-full flex flex-col items-center justify-center`}
					>
						<ShoppingCartIcon
							className={`h-5 w-5 ${
								scrolling ? 'text-main' : 'text-white'
							}`}
						/>
					</Link>
					<Link
						href={'/signin'}
						className={`h-10 w-10 ${
							scrolling ? 'bg-white' : 'bg-main'
						} rounded-full flex flex-col items-center justify-center`}
					>
						<User2
							className={`h-5 w-5 ${
								scrolling ? 'text-main' : 'text-white'
							}`}
						/>
					</Link>
				</div>
			</div>

			{/* MOBILE SIDEBAR */}
			<nav
				style={{
					boxShadow: 'rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;',
				}}
				className={` ${
					showMenu ? 'flex' : 'hidden'
				} py-2 px-8 absolute top-0 left-0 h-screen w-[400px] z-10 sm:hidden flex-col items-start gap-y-10 bg-white backdrop-blur-sm`}
			>
				<div className={`flex items-center justify-between w-full`}>
					<Link href={'/'} onClick={toggleMenu}>
						<Image
							alt='logo'
							width={50}
							height={50}
							className=''
							src={'/logo.svg'}
						/>
					</Link>
					<Button
						type='button'
						variant={'outline'}
						onClick={toggleMenu}
						className='border-0 font-bold'
					>
						x
					</Button>
				</div>

				<div className='flex flex-col items-start gap-y-12'>
					{NavLinks.map((link) => (
						<Link
							href={link.url}
							key={link.title}
							onClick={toggleMenu}
							className={`text-sm `}
						>
							{link.title}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
};

export default MainNavbar;
