import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// para que no salte error en la prueba de notes.test.js/startUploading (no funciona)
// const noScroll = () => {};
// Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true});