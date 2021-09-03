import { Box } from 'grommet';
import CustomButton from '../CustomButton';
const clickHandler = (e, location) => {
    e.preventDefault();
    window.location.assign(location)
}
const buttons = [
    { name: 'Login', onClick: (e) => clickHandler(e, 'login') },
    { name: 'Sign Up', onClick: (e) => clickHandler(e, 'sign-up') }
];

export default function PageHeader() {
    return (
        <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="end"
            background="dark_2"
            height="60px"
        >
            <Box
                justify='between'
                direction='row'
                width='175px'
            >
                {buttons.map(button => (<CustomButton key={`${button.name}-button`} {...button} />))}
            </Box>
        </Box>
    )
}