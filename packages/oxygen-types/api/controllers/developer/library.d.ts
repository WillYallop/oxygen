// Key D_Library_
import { Res_JSONBodyData, Res_JSONBody } from '../../responses';
import { Library } from '@prisma/client';
import { Util_GetImagesResponse } from '../../utilities/get-image';

// -------------------------------
// Create Library
// -------------------------------

// body
export interface D_Library_CreateLibraryBody {
    library_name: Library['library_name'];
    name: Library['name'];
    description: Library['description'];
    tags: Library['tags'];
    public: Library['public'];
    content: Library['content'];
    free: Library['free'];
    price: Library['price'];
}
// res
interface D_Library_CreateLibraryResBodyData extends Res_JSONBodyData {
    attributes: {
        id: Library['id'];
        type: Library['type'];
        deactivated: Library['deactivated'];
        verified: Library['verified'];
        developerId: Library['developer_id'];
        created: Library['created'];
        modified: Library['modified'];
        libraryName: Library['library_name'];
        name: Library['name'];
        description: Library['description'];
        content: Library['content'];
        tags: Library['tags'];
        public: Library['public'];
        free: Library['free'];
        price: Library['price'];
        currencyCode: Library['currency_code'];
    };
}
export interface D_Library_CreateLibraryRes extends Res_JSONBody {
    data: Array<D_Library_CreateLibraryResBodyData>;
}

// -------------------------------
// Get Multiple Library
// -------------------------------

// body
export interface D_Library_GetMultipleLibraryBody {}
// res
export interface D_Library_GetMultipleLibraryResBodyData
    extends Res_JSONBodyData {
    attributes: {
        id: Library['id'];
        type: Library['type'];
        deactivated: Library['deactivated'];
        verified: Library['verified'];
        created: Library['created'];
        modified: Library['modified'];
        libraryName: Library['library_name'];
        name: Library['name'];
        description: Library['description'];
        public: Library['public'];
        images: Util_GetImagesResponse;
    };
}
export interface D_Library_GetMultipleLibraryRes extends Res_JSONBody {
    data: Array<D_Library_GetMultipleLibraryResBodyData>;
}

// -------------------------------
// Get Single Library
// -------------------------------

// body
export interface D_Library_GetSingleLibraryBody {}
// res
export interface D_Library_GetSingleLibraryResBodyData
    extends Res_JSONBodyData {
    attributes: {
        id: Library['id'];
        type: Library['type'];
        deactivated: Library['deactivated'];
        verified: Library['verified'];
        created: Library['created'];
        modified: Library['modified'];
        libraryName: Library['library_name'];
        name: Library['name'];
        description: Library['description'];
        public: Library['public'];
        developerId: Library['developer_id'];
        tags: Library['tags'];
        free: Library['free'];
        price: Library['price'];
        currencyCode: Library['currency_code'];
        content: Library['content'];
        images: Util_GetImagesResponse;
    };
}
export interface D_Library_GetSingleLibraryRes extends Res_JSONBody {
    data: Array<D_Library_GetSingleLibraryResBodyData>;
}
