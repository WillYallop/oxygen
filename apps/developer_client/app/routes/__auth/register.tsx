import { Input } from 'ui';

const Register = () => {
    return (
        <div className="">
            <h1>Register</h1>
            <Input
                id={'id'}
                name={'name'}
                type={'text'}
                value={''}
                updateValue={() => {}}
                required={true}
            />
        </div>
    );
};

export default Register;
