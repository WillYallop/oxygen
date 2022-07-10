import { createContext } from 'react';
import { D_Library_GetMultipleLibraryRes } from 'oxygen-types';

// ---------------------------------------
// Library Component
// ---------------------------------------
interface LibraryComponentContextInt {
    component: D_Library_GetMultipleLibraryRes;
    setComponent?: any;
}
export const defaultLibraryComponentContext = {
    component: {} as D_Library_GetMultipleLibraryRes,
};
export const LibraryComponentContext = createContext<
    Partial<LibraryComponentContextInt>
>(defaultLibraryComponentContext);
