import { Box, Text } from 'grommet';
import CustomButton from '../CustomButton';
import Auth from '../../utils/auth';
const clickHandler = (e, location) => {
    e.preventDefault();
    window.location.assign(location)
};
const historyHandler = async (e) => {
    e.preventDefault();
    const d = await Auth.getProfile();
    const id = d.data._id;
    window.location.assign(`/user-history/${id}`)
};
const logoutHandler = (e) => {
    e.preventDefault();
    Auth.logout();
}
const buttons = [
    { name: 'Login', onClick: (e) => clickHandler(e, 'login') },
    { name: 'Sign Up', onClick: (e) => clickHandler(e, 'sign-up') }
];
const loggedInButtons = [
    { name: 'History', onClick: (e) => historyHandler(e) },
    { name: 'Logout', onClick: (e) => logoutHandler(e) }
]
export default function PageHeader() {
    const loggedIn = Auth.getToken();
    return (
        <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            background="dark_1"
            pad='small'
        >
            <Box>
                <Text color='accent-1' size='xxlarge' onClick={() => window.location.assign('/health')}>H</Text>
            </Box>
            <Box
                justify='between'
                direction='row'
                width='175px'
            >

                {!loggedIn ? buttons.map(button => (<CustomButton key={`${button.name}-button`} {...button} />)) : loggedInButtons.map(button => (<CustomButton key={`${button.name}-button`} {...button} />))}
            </Box>
        </Box>)
}