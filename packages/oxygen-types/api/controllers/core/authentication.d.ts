// Key C_Auth_
import { Res_JSONBodyData, Res_JSONBody } from '../../responses';
import { User } from '@prisma/client';

// -------------------------------
// REGISTER USER
// -------------------------------

// body
export interface C_Auth_RegisterUserBody {
    username: User['username'];
    firstName: User['first_name'];
    lastName: User['last_name'];
    email: User['email'];
    password: User['password'];
    passwordRepeat: User['password'];
}
// res
interface C_Auth_RegisterUserResBodyData extends Res_JSONBodyData {
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
    data: Array<C_Auth_RegisterUserResBodyData>;
}

// -------------------------------
// SIGN USER IN
// -------------------------------

// body
export interface C_Auth_SignInBody {
    usernameOrEmail: User['email'] | User['username'];
    password: User['password'];
}
// res
export interface C_Auth_SignInRes extends Res_JSONBody {
    data: Array<>;
}
