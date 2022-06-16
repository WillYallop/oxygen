import { AxiosResponse } from 'axios';
import { Res_Error } from '../';

export interface AxiosWrapperRes {
    success: boolean;
    formData: any;
    response?: AxiosResponse; // response data
    errors?: Array<Res_Error>;
}
