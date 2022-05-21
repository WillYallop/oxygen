import C from 'oxygen-constants';

interface NIVExtendProps {
    value: any;
}

export const nameRegexCb = (data: NIVExtendProps) => {
    const regex = new RegExp(C.REGEX.NAME_VALIDATOR);
    return regex.test(data.value);
};
