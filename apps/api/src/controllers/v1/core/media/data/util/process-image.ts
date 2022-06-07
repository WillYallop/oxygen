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
    images: {
        webp?: Buffer;
        // avif?: Buffer;
        jpeg?: Buffer;
        png?: Buffer;
    };
    metadata: {
        resolution?: [number, number];
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
        const res: ProcessImageRes = {
            images: {},
            metadata: {},
        };

        const sizes = [];

        const metadata = await sharp(params.input).metadata();

        if (metadata.hasAlpha)
            (res.images.png = await convertToPNG(params)),
                sizes.push(res.images.png.length);
        else
            (res.images.jpeg = await convertToJPEG(params)),
                sizes.push(res.images.jpeg.length);
        res.images.webp = await convertToWebP(params);
        // res.avif = await convertToAVIF(params);

        sizes.push(res.images.webp.length);
        // sizes.push(res.images.avif.length);

        // work out average size saving
        let newSizeAvg = 0;
        sizes.map(size => (newSizeAvg += size));
        newSizeAvg / sizes.length;
        let percent = (newSizeAvg / params.input.length) * 100;
        res.metadata.averageSavings = percent;

        // add meta resolution
        if (params.resize !== undefined)
            res.metadata.resolution = params.resize;
        else if (metadata.width !== undefined && metadata.height !== undefined)
            res.metadata.resolution = [metadata.width, metadata.height];

        return res;
    } catch (err) {
        throw err;
    }
};

export default processImage;
