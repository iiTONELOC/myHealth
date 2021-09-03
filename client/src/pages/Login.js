import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import {
    Box,
    Button,
    FormField,
    Heading,
    TextInput,
} from 'grommet';



export default function Login() {
    // state of the form
    const [formState, setFormState] = useState({ email: '', password: '' });
    // graphQl mutation to login 
    const [login, { error }] = useMutation(LOGIN_USER);
    // change event handler
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    // form submit
    const handleFormSubmit = async event => {
        event.preventDefault();
        /*
        Try to login, catch any errors
        if login is successful in the DB
        Handle the login with our JWT utility function
        */
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            const userData = await { ...data };
            // if we have a successful login
            if (userData) {
                const data = userData;
                // destructure the token
                const { login } = await data;
                const { token } = await login;
                // handle with JWT
                Auth.login(token)
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Box
            fill='true'
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
                    <Box flex={false} as="footer" align="start" pad='small'>
                        <Button
                            type="submit"
                            label="Login"
                            onClick={handleFormSubmit}
                            primary
                            color='brand_accent'
                        />
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};