'use client';

import {cn} from '@/lib/utils';

interface FormTextInputProps {
	disabled?: boolean;
	classes?: string;
	name: string;
	value: string;
	// minLength?: number;
	// maxLength?: number;
	padding?: string;
	placeHolder: string;
	type?: 'text' | 'password' | 'number';
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTextInput = ({
	disabled,
	classes,
	name,
	value,
	// minLength,
	// maxLength,
	handleChange,
	padding,
	placeHolder,
	type,
}: FormTextInputProps) => {
	return (
		<input
			name={name}
			value={value}
			placeholder={placeHolder}
			type={type ? type : 'text'}
			disabled={disabled ? disabled : false}
			onChange={(event) => handleChange(event)}
			className={cn(
				'placeholder:text-[12px] text-[12px] hover:outline-none focus:outline-none focus:border-gray-600',
				classes,
				padding ? padding : 'px-5 py-4'
			)}
		/>
	);
};

export default FormTextInput;
