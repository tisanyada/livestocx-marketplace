interface UpdateVendorProfileDto {
	name: string;
	location?: string;
	address: string;
	avatar: File | null;
	avatarUrl: string;
	email: string;
	phoneNumber: string;
	isUpdated: boolean;
}

export function ValidateUpdateVendorProfileFormData(
	formData: UpdateVendorProfileDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Vendor name is required.');
	}

	if (!formData.location) {
		return (message = 'Vendor location is required.');
	}

	if (!formData.address) {
		return (message = 'Vendor address is required.');
	}

	if (!formData.email) {
		return (message = 'Email is required.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}

	if (!formData.isUpdated && !formData.avatar) {
		return (message = 'Avatar is required.');
	}
	if (!formData.isUpdated && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded avatar type is not a valid image.');
	}

	return message;
}
