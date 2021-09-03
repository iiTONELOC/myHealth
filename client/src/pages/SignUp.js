import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/helpers';
import {
    Box,
    Button,
    FormField,
    Heading,
    TextInput,
} from 'grommet';

export default function SignUp() {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [userError, setUserError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signUpError, setAlert] = useState('');
    const [addUser, { error }] = useMutation(ADD_USER);
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setEmailError('Your email is invalid.');
            } else {
                setEmailError('');
            }
        } else if (e.target.name === 'username') {
            if (e.target.value.length < 2) {
                setUserError(`Username's must be at least 2 characters!`)
            } else {
                setUserError('')
            }
        } else if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                setPasswordError(`Password's must be at least 5 characters!`)
            } else {
                setPasswordError(``)
            }
        }

    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            if (data.addUser !== null) {
                Auth.login(data.addUser.token);
            } else {
                console.log(data)
            }
            return
        } catch (e) {
            console.log(e);
            setAlert(true)
            setTimeout(() => {
                setAlert('')
            }, 9000)
        }
    };
    return (
        <Box

            align="center"
            justify="center"
            background='black'
            height={{ min: '92vh' }}
            width={{ min: '100vw' }}
        >
            <Box
                overflow="auto"
                width="medium"
                pad="medium"
                background='dark-1'
            >
                <Box flex={false} direction="row" justify="between" background=''>
                    <Heading level={2} margin="none">
                        Create Account
                    </Heading>
                    {error && error.message}
                    {signUpError}
                </Box>
                <Box flex="grow" overflow="auto" pad='small'>
                    <FormField label="Username">
                        <TextInput
                            name='username'
                            type='username'
                            id='username'
                            value={formState.username}
                            onChange={handleChange}
                            required />
                    </FormField>
                    {userError && (<div><p
                        style={{
                            color: 'red',
                        }}
                    >
                        {userError}
                    </p>
                    </div>
                    )}
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
                        {!userError && !emailError && !passwordError && (<Button
                            type="submit"
                            label="Sign Up"
                            onClick={handleFormSubmit}
                            primary
                            color='accent-1'
                        />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};