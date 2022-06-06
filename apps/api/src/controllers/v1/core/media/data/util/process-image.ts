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
    webp?: Buffer;
    // avif?: Buffer;
    jpeg?: Buffer;
    png?: Buffer;
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
        const res: ProcessImageRes = {};
        const metadata = await sharp(params.input).metadata();
        if (metadata.hasAlpha) res.png = await convertToPNG(params);
        else res.jpeg = await convertToJPEG(params);
        res.webp = await convertToWebP(params);
        // res.avif = await convertToAVIF(params);
        return res;
    } catch (err) {
        throw err;
    }
};

export default processImage;
