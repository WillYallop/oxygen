import axios, { AxiosError } from 'axios';
import { Res_ExpressErrorObj, AxiosWrapperRes } from 'oxygen-types';

interface AxiosWrapperProps<BodyData> {
    path: string;
    Cookie?: any;
    method: 'get' | 'post' | 'patch' | 'delete';
    body?: BodyData;
    formData?: any;
}

const axiosWrapper = async <ResponseData, BodyData>(
    props: AxiosWrapperProps<BodyData>,
): Promise<AxiosWrapperRes<ResponseData>> => {
    try {
        const res = await axios({
            url: props.path,
            data: props.body,
            headers: {
                Cookie: props.Cookie,
            },
            method: props.method,
            baseURL: process.env.API_DOMAIN,
            withCredentials: true,
        });
        return {
            success: true,
            response: res,
            formData: props.formData,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            let err = error as AxiosError<Res_ExpressErrorObj>;
            return {
                success: false,
                errors: err.response?.data.errors,
                formData: props.formData,
            };
        } else {
            return {
                success: false,
                errors: [
                    {
                        status: 500,
                        source: (error as Error).stack || 'UNKNOWN',
                        title: (error as Error).name,
                        detail: (error as Error).message,
                    },
                ],
                formData: props.formData,
            };
        }
    }
};

export default axiosWrapper;
