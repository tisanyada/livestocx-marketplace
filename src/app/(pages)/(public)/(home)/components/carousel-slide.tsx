'use client';

import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

interface Slide {
	id: number;
	image: string;
	description: string;
}

const CarouselSlideItems: Slide[] = [
	{
		id: 1,
		image: '/carousel__1.png',
		description: 'High quality animal stock by professional suppliers',
	},
	{
		id: 2,
		image: '/carousel__2.png',
		description: 'Get pets from the best dealers in Nigeria!',
	},
	{
		id: 3,
		image: '/carousel__3.png',
		description: 'Discover new livestock sellers on Livestocx!',
	},
];

const CarouselSlide = () => {
	const [currentSlide, setCurrentSlide] = useState<Slide>(
		CarouselSlideItems[0]
	);

	return (
		<div className='w-full md:h-[250px] bg-[#262626] md:rounded-lg flex flex-col justify-between px-5 md:px-10 py-10 relative'>
			<div className='flex flex-col space-y-6'>
				<p className='p-3 bg-orange-400 md:w-[220px] text-center text-white text-sm rounded-lg'>
					Welcome to Livestocx!
				</p>

				<div className='p-3 md:ml-6 rounded-lg border-2 border-orange-400 flex flex-col space-y-2 items-center justify-center md:w-[350px] text-center text-white'>
					<p>{currentSlide.description}</p>

					<Button
						type='button'
						className='text-black bg-white hover:bg-white'
					>
						Learn More
					</Button>
				</div>
			</div>

			<div className='flex justify-center space-x-3 mt-5 md:mt-0'>
				{[1, 2, 3].map((item) => (
					<div
						key={item}
						className={`w-2 h-2 rounded-full ${
							currentSlide.id === item ? 'bg-main' : 'bg-white'
						} cursor-pointer`}
						onClick={() => {
							const index = CarouselSlideItems.findIndex(
								(slide) => slide.id === item
							);

							// console.log('[SLIDE]', index);

							setCurrentSlide(CarouselSlideItems[index]);
						}}
					></div>
				))}
			</div>

			<div className='absolute right-0 bottom-0 w-0 md:h-[200px] md:w-[400px]'>
				<Image
					fill
					// width={400}
					// height={300}
					src={currentSlide.image}
					className='rounded-tr-lg object-cover h-full w-full'
					alt={`LiveStocx Carousel - ${currentSlide.description}`}
				/>
			</div>
		</div>
	);
};

export default CarouselSlide;
