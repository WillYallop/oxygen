import { LibraryMedia } from '@prisma/client';
import { Util_BuildURLsRes } from './build-image-url';

export interface Util_ImageObject {
    alt: LibraryMedia['alt'];
    title: LibraryMedia['title'];
    width: LibraryMedia['width'];
    height: LibraryMedia['height'];
    src: Array<Util_BuildURLsRes>;
}

export interface Util_GetImagesResponse {
    icon: Array<Util_ImageObject>;
    banner: Array<Util_ImageObject>;
    preview: Array<Util_ImageObject>;
    desktop: Array<Util_ImageObject>;
    tablet: Array<Util_ImageObject>;
    mobile: Array<Util_ImageObject>;
}
