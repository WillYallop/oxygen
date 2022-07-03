// key Res_

// JSON body response interface
export interface Res_JSONBody {
    links?: {
        self?: string;
        next?: string;
        previous?: string;
        last?: string;
    };
    data: Array<Res_JSONBodyData>;
}

export interface Res_JSONBodyData {
    type: string; // ie: article, use, component
    id: string;
    attributes?: {};
    relationships?: {};
    links?: {
        self?: string;
    };
}

// Error response interface
export interface Res_Error {
    status: number;
    source: string;
    title: string;
    detail: string;
}

export interface Res_ExpressErrorObj {
    errors: Array<Res_Error>;
}

export type Res_ExpressError = Res_JSONBody | Res_ExpressErrorObj;
