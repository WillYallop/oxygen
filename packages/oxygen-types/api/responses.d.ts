// key Res_

// JSON body response interface
export interface Res_JSONBody {
  links?: {
    self?: string;
    next?: string;
    last?: string;
  };
  data: Array<{
    type: string; // ie: article, use, component
    id: string;
    attributes?: {};
    relationships?: {};
    links?: {
      self?: string;
    };
  }>;
}

// Error response interface
export interface Res_Error {}
