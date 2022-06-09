import C from 'oxygen-constants';

interface NIVExtendProps {
    value: string | number;
}

export const nameRegexCb = (data: { value: string }) => {
    const regex = new RegExp(C.REGEX.NAME_VALIDATOR);
    return regex.test(data.value);
};

export const libraryTypeCb = (data: { value: string }) => {
    if (
        data.value === 'component' ||
        data.value === 'plugin' ||
        data.value === 'kit'
    )
        return true;
    return false;
};
