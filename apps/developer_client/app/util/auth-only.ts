import Cookies from 'js-cookie';

export default () => {
    const state = Cookies.get('signedIn');
    console.log(state);
};
