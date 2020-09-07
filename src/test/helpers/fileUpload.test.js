import cloudinary from 'cloudinary';
import { fileUpload } from './../../helpers/fileUpload';

cloudinary.config({
	cloud_name: 'hadesdev',
	api_key: '863213963382967',
	api_secret: 'yB22qLtqLepYwXm2O6x_0wjLkFM',
});
describe('Pruebass en fireupload', () => {
	test('debe de cargar un archivo y retornar el URL', async (done) => {
		//obtener la imagen
		const img = await fetch(
			'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg'
		);
		const blob = await img.blob();
		// console.log(blob);
		const file = new File([blob], 'foto.svg');
		const url = await fileUpload(file);

		// console.log(url);

		expect(typeof url).toBe('string');
		const segments = url.split('/');
		// console.log(segments);
		const imageId = segments[segments.length - 1].replace('.svg', '');
		// console.log(imageId);

		//borrar imagen por id
		cloudinary.v2.api.delete_resources(imageId, {}, () => {
			done();
		});
	});

	test('debe de retornar un error', async () => {
		//obtener la imagen

		const file = new File([], 'foto.svg');
		const url = await fileUpload(file);

		// console.log(url);

		expect(url).toBe(null);
	});
});
