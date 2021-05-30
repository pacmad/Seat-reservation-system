const Enzyme = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
};

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;