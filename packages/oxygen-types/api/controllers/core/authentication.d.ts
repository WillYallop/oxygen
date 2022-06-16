// Key C_Auth_
import { Res_JSONBodyData, Res_JSONBody } from '../../responses';
import { User } from '@prisma/client';

// Auth user res
interface C_Auth_RegisterUserBodyData extends Res_JSONBodyData {
    attributes: {
        firstName: User['first_name'];
        lastName: User['last_name'];
        email: User['email'];
        username: User['username'];
        country: User['country'];
        locality: User['locality'];
        postalCode: User['postal_code'];
        streetAddress: User['street_address'];
        premise: User['premise'];
        accountCreated: User['account_created'];
    };
}
export interface C_Auth_RegisterUserRes extends Res_JSONBody {
    data: Array<C_Auth_RegisterUserBodyData>;
}
