import axiosWrapper from '../../../../util/axios-wrapper';
import { useState } from 'react';
import {
    D_Library_CreateLibraryBody,
    D_Library_CreateLibraryRes,
} from 'oxygen-types';
import { ActionFunction, redirect } from '@remix-run/node';
// Components
import Header from '~/components/Layout/Header';
import BackBar from '~/components/Layout/BackBar';
import { Textarea } from 'ui';
import { Form } from '@remix-run/react';
import LibraryPageContent from '~/components/Library/Inputs/Content';
import LibraryMeta from '~/components/Library/Inputs/Meta';

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

const RegisterComponent: React.FC = () => {
    const [content, setContent] = useState('');

    return (
        <>
            <Header hasSearch={false} />
            <BackBar text={'Back'} link={'/components'} />
            <div className="l--sp-t l--sp-h">
                <Textarea className="t__wrapper--m">
                    <>
                        <h1>Register a new component</h1>
                        <p>
                            The better listing you create for your component:
                            the higher chance it has to become popular! Start by
                            entering the core information about your component.
                        </p>
                    </>
                </Textarea>
                <Form className="form--with-bottom-bar">
                    {/* Meta */}
                    <LibraryMeta
                        title="Meta Information"
                        body="Tell us about your component."
                    />
                    {/* Page Content */}
                    <LibraryPageContent
                        title="Page Content"
                        body="In markdown, describe, document and sell your component."
                        value={content}
                        setValue={setContent}
                    />

                    {/* Submit bar */}
                    <div className="form__bottom-bar l--sp-th l--bm-t-m">
                        <button
                            className="btn-style__main"
                            type="submit"
                            name="intent"
                            value={'registerForm'}
                        >
                            Register
                        </button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default RegisterComponent;
