import axios, { AxiosError, AxiosResponse } from 'axios';
import { Res_ExpressErrorObj, AxiosWrapperRes } from 'oxygen-types';

interface AxiosWrapperProps {
    path: string;
    method: 'get' | 'post' | 'patch' | 'delete';
    body?: any;
    formData: any;
}

const axiosWrapper = async <ResponseData>(
    props: AxiosWrapperProps,
): Promise<AxiosWrapperRes<ResponseData>> => {
    try {
        const res = await axios({
            url: props.path,
            data: props.body,
            method: props.method,
            baseURL: process.env.API_DOMAIN,
        });
        return {
            success: true,
            response: res.data,
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
