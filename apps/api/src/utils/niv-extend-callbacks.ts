import C from 'oxygen-constants';

interface NIVExtendProps {
    value: string;
}

export const nameRegexCb = (data: NIVExtendProps) => {
    const regex = new RegExp(C.REGEX.NAME_VALIDATOR);
    return regex.test(data.value);
};

export const libraryTypeCb = (data: NIVExtendProps) => {
    if (
        data.value === 'component' ||
        data.value === 'plugin' ||
        data.value === 'kit'
    )
        return true;
    return false;
};

export const libraryNameCb = (data: NIVExtendProps) => {
    const regex = new RegExp(C.REGEX.LIBRARY_NAME_VALIDATOR);
    return regex.test(data.value);
};
