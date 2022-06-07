import sharp from 'sharp';

// * Description
/*  
    Responsible for converting and optimising images. This process will likely be offloaded in some capacity in the future.

    Convert images to avif and webp, then one "legacy" format (png, jpeg) depending on if the input has transparency.
*/

interface ProcessImageParams {
    input: Buffer;
    resize?: [number, number];
    quality?: number;
}

interface ProcessImageRes {
    images: Array<{
        data: Buffer;
        mime: string;
        ext: string;
    }>;
    metadata: {
        resolution: [number, number];
        averageSavings?: number;
    };
}

// Constants
const DEFAULT_QUALITY = 80;

// convert to JPEG
export const convertToJPEG = async (params: ProcessImageParams) => {
    try {
        if (params.resize !== undefined) {
            const image = await sharp(params.input)
                .rotate()
                .resize(params.resize[0], params.resize[1])
                .jpeg({
                    mozjpeg: true,
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        } else {
            const image = await sharp(params.input)
                .rotate()
                .jpeg({
                    mozjpeg: true,
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        }
    } catch (err) {
        throw err;
    }
};

// convert to PNG
export const convertToPNG = async (params: ProcessImageParams) => {
    try {
        if (params.resize !== undefined) {
            const image = await sharp(params.input)
                .rotate()
                .resize(params.resize[0], params.resize[1])
                .png({
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        } else {
            const image = await sharp(params.input)
                .rotate()
                .png({
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        }
    } catch (err) {
        throw err;
    }
};

// convert to WebP
export const convertToWebP = async (params: ProcessImageParams) => {
    try {
        if (params.resize !== undefined) {
            const image = await sharp(params.input)
                .rotate()
                .resize(params.resize[0], params.resize[1])
                .webp({
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        } else {
            const image = await sharp(params.input)
                .rotate()
                .webp({
                    quality: params.quality || DEFAULT_QUALITY,
                })
                .toBuffer();
            return image;
        }
    } catch (err) {
        throw err;
    }
};

// convert to AVIF
export const convertToAVIF = async (params: ProcessImageParams) => {
    try {
        if (params.resize !== undefined) {
            const image = await sharp(params.input)
                .rotate()
                .resize(params.resize[0], params.resize[1])
                .avif()
                .toBuffer();
            return image;
        } else {
            const image = await sharp(params.input).rotate().avif().toBuffer();
            return image;
        }
    } catch (err) {
        throw err;
    }
};

// return multiple process images
const processImage = async (
    params: ProcessImageParams,
): Promise<ProcessImageRes> => {
    try {
        const sizes = [];
        const metadata = await sharp(params.input).metadata();

        const res: ProcessImageRes = {
            images: [],
            metadata: {
                resolution:
                    params.resize !== undefined
                        ? params.resize
                        : [metadata.width || 0, metadata.height || 0],
            },
        };

        if (metadata.hasAlpha) {
            const pngImageBuffer = await convertToPNG(params);
            res.images.push({
                data: pngImageBuffer,
                mime: 'image/png',
                ext: '.png',
            });
            sizes.push(pngImageBuffer.length);
        } else {
            const jpegImageBuffer = await convertToJPEG(params);
            res.images.push({
                data: jpegImageBuffer,
                mime: 'image/jpeg',
                ext: '.jpeg',
            });
            sizes.push(jpegImageBuffer.length);
        }

        const webpImageBuffer = await convertToWebP(params);
        res.images.push({
            data: webpImageBuffer,
            mime: 'image/webp',
            ext: '.webp',
        });
        sizes.push(webpImageBuffer.length);

        // work out average size saving
        let newSizeAvg = 0;
        sizes.map(size => (newSizeAvg += size));
        newSizeAvg / sizes.length;
        let percent = (newSizeAvg / params.input.length) * 100;
        res.metadata.averageSavings = percent;

        return res;
    } catch (err) {
        throw err;
    }
};

export default processImage;
