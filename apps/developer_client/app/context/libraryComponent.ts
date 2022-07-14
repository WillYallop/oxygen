import { createContext } from 'react';
import { D_Library_GetSingleLibraryResBodyData } from 'oxygen-types';

// ---------------------------------------
// Library Component
// ---------------------------------------
interface LibraryComponentContextInt {
    component: D_Library_GetSingleLibraryResBodyData;
    setComponent?: any;
}
export const defaultLibraryComponentContext = {
    component: {} as D_Library_GetSingleLibraryResBodyData,
};
export const LibraryComponentContext = createContext<
    Partial<LibraryComponentContextInt>
>(defaultLibraryComponentContext);
