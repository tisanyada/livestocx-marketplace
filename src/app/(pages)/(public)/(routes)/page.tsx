'use client';
import Lottie from 'lottie-react';
import {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import SearchForm from './components/search-form';
import HomeProducts from './components/home-products';
import {useGlobalStore} from '@/hooks/use-global-store';
import CarouselSlide from './components/carousel-slide';
import TestimonialSection from '@/components/common/testimonials';
import EmptyAnimation from '../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../public/animations/loading__animation__1.json';
import Image from 'next/image';

export default function HomePage() {
	const userStore = useUserHook();
	const {products, updateProducts, updatePagination} = useGlobalStore();

	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all`
			);

			console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(true);
		} catch (error) {
			setLoading(true);

			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<main className='bg-[#28312B]'>
			<section className='md:h-screen w-full bg-home flex flex-col items-center justify-end gap-y-16 pt-28 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />

				<div className='md:px-8 pb-10 w-full'>
					<CarouselSlide />
				</div>
			</section>

			{loading && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && products?.length === 0 && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && products?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
					<HomeProducts />
				</div>
			)}

			<TestimonialSection />
		</main>
	);
}
