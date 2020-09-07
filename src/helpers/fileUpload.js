export const fileUpload = async (file) => {
	const cloudUrl = 'https://api.cloudinary.com/v1_1/hadesdev/upload';

	const formData = new FormData();

	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		if (resp.ok) {
			const cloudResp = await resp.json();
			return cloudResp.secure_url;
		} else {
			//error de clouddinary
			return null;
		}
	} catch (error) {
		//eror de manerjo, puede ser que el url no exista es un error del fetch
		throw error;
	}
};
