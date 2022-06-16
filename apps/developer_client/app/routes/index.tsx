import { Button } from 'ui';
import { json, LoaderFunction, redirect } from '@remix-run/node';
import checkAuth from '../util/check-auth';

export const loader: LoaderFunction = ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const hasAuth = checkAuth(cookieHeader);
    if (!hasAuth) return redirect('/signin');

    return json({});
};

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Remix</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                egestas nec lacus ac gravida. Nulla id bibendum erat, sed varius
                ligula. Duis sollicitudin neque risus, non elementum libero
                tincidunt vel. Donec tincidunt urna arcu, quis iaculis lectus
                fringilla vitae. Aenean vehicula malesuada finibus. Etiam
                efficitur metus tortor. Morbi accumsan risus sodales nibh
                elementum, sit amet commodo ligula efficitur. Duis tincidunt non
                leo sed fermentum. Nullam pharetra turpis ex, ut posuere metus
                lobortis interdum. Nunc dictum tincidunt augue sit amet luctus.
                Donec vel pretium libero, ut cursus neque. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Vestibulum sed aliquam
                elit, commodo rutrum quam. Cras et eros volutpat, cursus mauris
                in, blandit dolor.
            </p>
            <Button></Button>
        </div>
    );
};

export default HomePage;
