import * as React from 'react';
import { Util_ImageObject } from 'oxygen-types';

interface PictureProps {
    data: Util_ImageObject;
}

export const Picture: React.FC<PictureProps> = ({ data }) => {
    const getSource = (
        ext: '.jpeg' | '.webp' | '.png',
        mime: 'image/jpeg' | 'image/webp' | 'image/png',
    ) => {
        const index = data.src.findIndex(x => x.extension === ext);
        if (index !== -1) {
            return (
                <source key={index} srcSet={data.src[index].src} type={mime} />
            );
        } else return null;
    };

    return (
        <picture className="picture">
            {getSource('.webp', 'image/webp')}
            {getSource('.jpeg', 'image/jpeg')}
            {getSource('.png', 'image/png')}
            <img src={data.src[0].src} alt={data.alt}></img>
        </picture>
    );
};
