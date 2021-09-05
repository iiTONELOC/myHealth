import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/helpers';
import {
    Box,
    Button,
    FormField,
    Heading,
    TextInput,
} from 'grommet';

export default function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [login, { error }] = useMutation(LOGIN_USER);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        if (event.target.name === 'email') {
            const isValid = validateEmail(event.target.value);
            if (!isValid) {
                setEmailError('Your email is invalid.');
            } else {
                setEmailError('');
            }
        } else if (event.target.name === 'password') {
            if (event.target.value.length < 6) {
                setPasswordError(`Password's must be at least 5 characters!`)
            } else {
                setPasswordError(``)
            }
        }
    };
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            const userData = await { ...data };
            if (userData) {
                const data = userData;
                const { login } = await data;
                const { token } = await login;
                Auth.login(token)
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Box
            fill
            align="center"
            justify="center"
            background='black'
        >
            <Box
                overflow="auto"
                width="medium"
                pad="medium"
                background='dark-1'
            >
                <Box flex={false} direction="row" justify="between" background=''>
                    <Heading level={2} margin="none">
                        Login
                    </Heading>
                    {error && error.message}
                </Box>
                <Box flex="grow" overflow="auto" pad='small'>
                    <FormField label="Email" >
                        <TextInput
                            color='brand_accent'
                            name='email'
                            type='email'
                            id='email'
                            value={formState.email}
                            onChange={handleChange}
                            required
                        />
                    </FormField>
                    {emailError && (<div ><p style={{ color: 'red' }}>{emailError}</p></div>)}
                    <FormField label="Password">
                        <TextInput
                            plain
                            name='password'
                            type='password'
                            value={formState.password}
                            onChange={handleChange}
                            required
                        />
                    </FormField>
                    {passwordError && (<div style={{ color: 'red' }}>{passwordError}</div>)}
                    <Box flex={false} as="footer" align="start" pad='small'>
                        {formState.email !== '' && formState.password !== '' && !emailError && !passwordError && (
                            <Button
                                type="submit"
                                label="Login"
                                onClick={handleFormSubmit}
                                primary
                                color='accent-1'
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};