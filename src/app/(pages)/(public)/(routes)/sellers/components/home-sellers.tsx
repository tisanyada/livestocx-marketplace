'use client';
import React, {Fragment} from 'react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import SellerInfoCard from './seller-info-card';
import {useGlobalStore} from '@/hooks/use-global-store';

const HomeSellers = () => {
	const {hasNextPage, vendors} = useGlobalStore();

	return (
		<Fragment>
			<div className='flex flex-wrap items-center justify-evenly w-full gap-y-10 md:gap-6 mt-10'>
				{vendors?.map((vendor) => (
					<SellerInfoCard key={vendor.id} vendor={vendor} />
				))}
			</div>

			{hasNextPage && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Load More</span>
					</Button>
				</div>
			)}
		</Fragment>
	);
};

export default HomeSellers;
