import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'rodrigov', 
    api_key: '766585548459598', 
    api_secret: 'WDQCW4c4v1lszyMS4XmZH7fTAWI' 
  });

describe('Pruebas en fileUpload', () => {
   
    // // test('debe de cargar un archivo y retornar el URL', async(done) => {
    // test('debe de cargar un archivo y retornar el URL', async() => {
       
    //     const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    //     const blob = await resp.blob();

    //     const file = new File([blob], 'imagen.png');
    //     const url = await fileUpload(file);

    //     expect(typeof url).toBe('string');

    //     const segments = url.split('/');
    //     const imageId = segments[segments.length - 1].replace('.png', '');
        
    //     cloudinary.v2.api.delete_resources(imageId, {}, () => {
    //         // done();
    //     });

    // });


    test('debe de retornar un error', async() => {

        const file = new File([], 'imagen.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
        

    });
    

});
