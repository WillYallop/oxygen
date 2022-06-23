import axiosWrapper from '../../../util/axios-wrapper';
import {
    D_Library_CreateLibraryBody,
    D_Library_CreateLibraryRes,
} from 'oxygen-types';
// Components
import Header from '~/components/Layout/Header';
import { Textarea } from 'ui';
import { Form } from '@remix-run/react';
import { ActionFunction, redirect } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');

    const formData = await request.formData();
    const intent = formData.get('intent');

    if (intent === 'registerForm') {
        const res = await axiosWrapper<
            D_Library_CreateLibraryRes,
            D_Library_CreateLibraryBody
        >({
            path: `v1/dev/library/${'component'}`,
            method: 'post',
            Cookie: cookieHeader,
            body: {
                name: '',
                description: '',
                tags: [],
                public: true,
                content: '',
                free: true,
                price: 0,
            },
        });
        if (res.success) {
            return redirect(
                `/components/edit/${res.response?.data?.data[0].id}`,
            );
        }
    }
};

const ComponentPage: React.FC = () => {
    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <Textarea>
                    <h1>My Components</h1>
                </Textarea>
                <div className="l--f l--f-j-sb  l--bm-t-l">
                    <div></div>
                    <div>
                        <Form action="/components?index" method="post">
                            <button
                                className={`btn-style__main`}
                                type="submit"
                                name="intent"
                                value="registerForm"
                            >
                                Register Component
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComponentPage;
