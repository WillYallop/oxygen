import axios, { AxiosError } from 'axios';
import { Res_ExpressErrorObj } from 'oxygen-types';

interface AxiosWrapperProps {
    path: string;
    method: 'get' | 'post' | 'patch' | 'delete';
    body?: any;
}

const axiosWrapper = async (props: AxiosWrapperProps) => {
    try {
        const res = await axios({
            url: props.path,
            data: props.body,
            method: props.method,
            baseURL: process.env.API_DOMAIN,
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            let err = error as AxiosError<Res_ExpressErrorObj>;
            throw new Error(
                `type-custom=${JSON.stringify(err.response?.data.errors)}`,
            );
        } else {
            throw new Error(`type-standard=${(error as Error).message}`);
        }
    }
};

export default axiosWrapper;
