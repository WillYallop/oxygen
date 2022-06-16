import { AxiosResponse } from 'axios';
import { Res_Error } from '../';

export interface AxiosWrapperRes<ResponseData> {
    success: boolean;
    formData: any;
    response?: AxiosResponse<ResponseData>; // response data
    errors?: Array<Res_Error>;
}
