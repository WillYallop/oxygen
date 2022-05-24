import C from 'oxygen-constants';

interface NIVExtendProps {
    value: string | number;
}

export const nameRegexCb = (data: { value: string }) => {
    const regex = new RegExp(C.REGEX.NAME_VALIDATOR);
    return regex.test(data.value);
};
