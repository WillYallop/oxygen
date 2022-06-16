import cookie from 'cookie';

export default (cookies: string | null) => {
    if (cookies) {
        const { signedIn } = cookie.parse(cookies);
        if (signedIn === 'false') return false;
        else return true;
    }
    return false;
};
