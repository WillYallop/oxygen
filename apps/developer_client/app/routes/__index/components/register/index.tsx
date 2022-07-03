import axiosWrapper from '~/util/axios-wrapper';
import { useState } from 'react';
import {
    D_Library_CreateLibraryBody,
    D_Library_CreateLibraryRes,
} from 'oxygen-types';
import { ActionFunction, redirect } from '@remix-run/node';
// Components
import Header from '~/components/Layout/Header';
import BackBar from '~/components/Layout/BackBar';
import FormWrapper from '~/components/Form/FormWrapper';
import { TextBlock } from 'ui';
import LibraryPageContent from '~/components/Library/Inputs/Content';
import LibraryMeta from '~/components/Library/Inputs/Meta';

export const action: ActionFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const formData = await request.formData();
    // intent
    const intent = formData.get('intent');
    // if register form intent
    let res;
    if (intent === 'registerForm') {
        const postData: D_Library_CreateLibraryBody = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            tags: JSON.parse((formData.get('tags') as string) || '[]'),
            public: true,
            content: (formData.get('content') as string) || ' ',
            free: true,
            price: 0,
        };
        res = await axiosWrapper<
            D_Library_CreateLibraryRes,
            D_Library_CreateLibraryBody
        >({
            path: `v1/dev/library/${'component'}`,
            method: 'post',
            Cookie: cookieHeader,
            body: postData,
        });
        if (res.success) {
            return redirect(
                `/components/edit/${res.response?.data?.data[0].id}`,
            );
        }
    }

    return res;
};

const RegisterComponent: React.FC = () => {
    const [content, setContent] = useState('');

    const FormInner = (
        <div className="">
            {/* Meta */}
            <LibraryMeta
                title="Meta Information"
                body="Tell us about your component."
                values={{
                    name: '',
                    description: '',
                    tags: [],
                }}
            />
            {/* Page Content */}
            <LibraryPageContent
                title="Page Content"
                body="In markdown, describe, document and sell your component."
                value={content}
                setValue={setContent}
            />
        </div>
    );

    return (
        <>
            <Header hasSearch={false} />
            <BackBar text={'Back'} link={'/components'} />
            <div className="l--sp-t l--sp-h">
                <TextBlock className="t__wrapper--m">
                    <>
                        <h1>Register a new component</h1>
                        <p>
                            The better listing you create for your component:
                            the higher chance it has to become popular! Start by
                            entering the core information about your component.
                        </p>
                    </>
                </TextBlock>
                <FormWrapper
                    inner={FormInner}
                    action={'/components/register?index'}
                    method={'post'}
                    submitType={'bottom-bar'}
                    submitText={'Register'}
                    formIntent={'registerForm'}
                />
            </div>
        </>
    );
};

export default RegisterComponent;
