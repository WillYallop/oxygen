import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import {
    D_Library_GetMultipleLibraryBody,
    D_Library_GetMultipleLibraryResBodyData,
    D_Library_GetMultipleLibraryRes,
} from 'oxygen-types';
import axiosWrapper from '~/util/axios-wrapper';
import cookie from 'cookiejs';
// Components
import Header from '~/components/Layout/Header';
import { TextBlock } from 'ui';
import LibraryComponentRow from '~/components/Library/ComponentRow';
import FilterDropdown, {
    FilterDropdownCallbackRes,
} from '~/components/Partials/FilterDropdown';
import { useState } from 'react';

const take = 10;

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');

    const env = {
        API_DOMAIN: process.env.API_DOMAIN,
    };

    const componentsRes = await axiosWrapper<
        D_Library_GetMultipleLibraryRes,
        D_Library_GetMultipleLibraryBody
    >({
        path: `v1/dev/library/component/start/${take}/desc`,
        method: 'get',
        Cookie: cookieHeader,
    });
    if (componentsRes.success) {
        return json({
            success: true,
            components: componentsRes.response?.data,
            env,
        });
    } else {
        return json({
            success: false,
            components: [],
            env,
        });
    }
};

interface ComponentPageLoader {
    success: boolean;
    components: D_Library_GetMultipleLibraryRes;
    env: {
        API_DOMAIN: string;
    };
}

const ComponentPage: React.FC = () => {
    const data = useLoaderData<ComponentPageLoader>();

    const [components, setComponents] = useState(data.components);
    const [compSectKey, setCompSectKey] = useState(1);

    const loadMore = async (url?: string) => {
        if (url) {
            const componentsRes = await axiosWrapper<
                D_Library_GetMultipleLibraryRes,
                D_Library_GetMultipleLibraryBody
            >({
                path: url,
                method: 'get',
                baseURL: data.env.API_DOMAIN,
            });
            if (componentsRes.success) {
                components.links = componentsRes.response?.data.links;
                components.data = components.data.concat(
                    componentsRes.response?.data.data || [],
                );
                setComponents(components);
                setCompSectKey(compSectKey + 1);
            }
        }
    };

    const filterCB = async (filters: FilterDropdownCallbackRes) => {
        const componentsRes = await axiosWrapper<
            D_Library_GetMultipleLibraryRes,
            D_Library_GetMultipleLibraryBody
        >({
            path: `v1/dev/library/component/start/${take}/${filters.order}`,
            method: 'get',
            baseURL: data.env.API_DOMAIN,
        });
        if (componentsRes.success) {
            setComponents(
                componentsRes.response?.data ||
                    ({} as D_Library_GetMultipleLibraryRes),
            );
        }
    };

    return (
        <>
            <Header hasSearch={false} />
            <div className="l--bp">
                <TextBlock>
                    <h1>My Components</h1>
                </TextBlock>
                {/* top row */}
                <div className="l--f l--f-j-sb l--bm-t-m">
                    <FilterDropdown
                        filters={{ order: true }}
                        callback={filterCB}
                    />
                    <Link
                        to={'/components/register'}
                        className={`btn-style__main`}
                    >
                        Register Component
                    </Link>
                </div>
                {/* body */}
                <div
                    className="l--bm-t-m l--bp-t-l l--border-t"
                    key={compSectKey}
                >
                    {components.data.map(c => {
                        return <LibraryComponentRow key={c.id} component={c} />;
                    })}

                    {/* Load more */}
                    {components.links?.next ? (
                        <button
                            className="btn-style__main l--bm-t-m"
                            onClick={() => loadMore(components.links?.next)}
                        >
                            Load more
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ComponentPage;
