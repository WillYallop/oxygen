// Key D_Library_
import { Res_JSONBodyData, Res_JSONBody } from '../../responses';
import { Library } from '@prisma/client';

// -------------------------------
// Create Library
// -------------------------------

// body
export interface D_Library_CreateLibraryBody {
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
