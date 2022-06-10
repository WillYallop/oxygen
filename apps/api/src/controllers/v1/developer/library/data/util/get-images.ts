import { LibraryMedia } from '@prisma/client';
import db from '../../../../../../utils/prisma-client';
import buildURLs, {
    BuildURLsRes,
} from '../../../../core/cdn/data/util/build-image-url';

// * Description
/*  
    Get all images for library and organise depending on their tag 
*/

interface ImageObject {
    alt: LibraryMedia['alt'];
    title: LibraryMedia['title'];
    width: LibraryMedia['width'];
    height: LibraryMedia['height'];
    src: Array<BuildURLsRes>;
}

interface GetImagesResponse {
    icon: Array<ImageObject>;
    banner: Array<ImageObject>;
    preview: Array<ImageObject>;
    desktop: Array<ImageObject>;
    tablet: Array<ImageObject>;
    mobile: Array<ImageObject>;
}

const getImages = async (
    id: LibraryMedia['library_id'],
    mode: 'multiple' | 'single',
): Promise<GetImagesResponse> => {
    const response: GetImagesResponse = {
        icon: [],
        banner: [],
        preview: [],
        desktop: [],
        tablet: [],
        mobile: [],
    };

    const images = await db.libraryMedia.findMany({
        where: {
            library_id: {
                equals: id,
            },
        },
        select: {
            alt: true,
            key: true,
            title: true,
            extensions: true,
            width: true,
            height: true,
            tag: true,
        },
    });

    for (let i = 0; i < images.length; i += 1) {
        let img = images[i];
        if (mode === 'multiple') {
            if (img.tag === 'icon' || img.tag === 'preview') {
                response[img.tag as 'icon' | 'preview'].push({
                    width: img.width,
                    height: img.height,
                    alt: img.alt,
                    title: img.title,
                    src: buildURLs('library', img.key, img.extensions),
                });
            }
        } else if (mode === 'single') {
            if (
                img.tag === 'icon' ||
                img.tag === 'preview' ||
                img.tag === 'banner' ||
                img.tag === 'desktop' ||
                img.tag === 'mobile' ||
                img.tag === 'tablet'
            ) {
                response[
                    img.tag as
                        | 'icon'
                        | 'preview'
                        | 'banner'
                        | 'desktop'
                        | 'mobile'
                        | 'tablet'
                ].push({
                    width: img.width,
                    height: img.height,
                    alt: img.alt,
                    title: img.title,
                    src: buildURLs('library', img.key, img.extensions),
                });
            }
        }
    }
    return response;
};

export default getImages;
