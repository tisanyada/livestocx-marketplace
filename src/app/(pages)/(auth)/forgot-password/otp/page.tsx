'use client';

import {useReducer, useRef, useState} from 'react';
import FormTextInput from '@/components/input/form-text-input';
import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import AuthHeader from '../../../../../components/header/auth-header';
import {useRouter} from 'next/navigation';

const numberOfInputs = 4;

const SignInPage = () => {
	const router = useRouter();

	const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));
	const inputRefs = useRef(Array(numberOfInputs).fill(null));

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (!parseInt(e.target.value)) return;

		const value = e.target.value;
		const newOtp = [...otp];
		newOtp[index] = value;

		setOtp(newOtp);

		if (value && index < numberOfInputs - 1) {
			inputRefs.current[index + 1]?.focus();

			console.log('[FOCUS]');
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' || e.key === 'Delete') {
			e.preventDefault();
			const newOtp = [...otp];
			newOtp[index] = ''; // Clear the input field on Backspace or Delete
			setOtp(newOtp);

			if (index > 0) {
				inputRefs.current[index - 1]?.focus(); // Move focus to the previous input field
			}
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[OTP-PAYLOAD] :: ', otp);

		router.push('/reset-password');
	};

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
				>
					<div className='space-y-3'>
						<h1 className='text-center text-2xl font-semibold'>
							Enter OTP
						</h1>
					</div>

					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							{otp.map((digit, index) => (
								<input
									key={index}
									name='number'
									value={digit}
									onChange={(e) => {
										handleInputChange(e, index);
									}}
									onKeyDown={(e) => {
										handleKeyDown(e, index);
									}}
									ref={(ref) =>
										(inputRefs.current[index] = ref)
									}
									className='h-10 py-8 md:py-10 px-4 w-[60px] md:w-[100px] text-center text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
								/>
							))}
						</div>

						<div className='flex justify-end'>
							<p className='text-sm cursor-pointer'>
								Resend Code?
							</p>
						</div>

						<Button
							type='submit'
							className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
