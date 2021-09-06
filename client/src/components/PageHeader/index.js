import { useState } from 'react';
import { Box, Text } from 'grommet';
import CustomButton from '../CustomButton';
import Auth from '../../utils/auth';
import { GiHamburgerMenu as MenuIcon } from 'react-icons/gi'
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
const renderButtonName = () => {
    const currentLocation = window.location.pathname;
    if (currentLocation === '/health') {
        return 'History'
    } else {
        return 'Daily Entry'
    }
};
const dailyHandler = (e) => {
    e.preventDefault();
    window.location.assign('/health')
}
const renderButtonOnClick = (e) => {
    const currentLocation = window.location.pathname;
    if (currentLocation === '/health') {
        return historyHandler(e)
    } else {
        return dailyHandler(e)
    }
}
const loggedInButtons = [
    { name: renderButtonName(), onClick: (e) => renderButtonOnClick(e) },
    { name: 'Logout', onClick: (e) => logoutHandler(e) },

];
const shouldShow = ({ loggedIn }) => {
    const width = window.innerWidth;
    if (loggedIn) {
        if (width <= 768) return (false);
        else {
            return (true)
        }
    } else {
        return true
    }

}
export default function PageHeader() {
    const loggedIn = Auth.getToken();
    const s = shouldShow({ loggedIn })
    const [show, setShow] = useState(s)

    const handleViz = () => {
        setShow(!show)
    }
    const handleMobile = () => {
        const ss = shouldShow({ loggedIn })
        setShow(ss)
    }
    window.addEventListener('resize', handleMobile);


    return (
        show ? <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            background="dark"
            pad='small'
            height='75px'
            border={{ side: 'bottom', size: 'xsmall', style: 'solid', color: 'accent-1' }}
            onDoubleClick={handleViz}
        >
            <Box>
                <Text color='accent-1' size='xxlarge' onClick={() => window.location.assign('/')}>H</Text>
            </Box>
            <Box
                justify='between'
                direction='row'
                gap='medium'
            >
                {!loggedIn ? buttons.map(button => (<CustomButton key={`${button.name}-button`} {...button} />)) : loggedInButtons.map(button => (<CustomButton key={`${button.name}-button`} {...button} />))}
            </Box>
        </Box> :
            <Box
                justify='center'
                onDoubleClick={handleViz}
                style={{ padding: '10px' }}
            >
                <MenuIcon color='#6FFFB0' size='35px' style={{ alignSelf: 'center' }} onClick={handleViz} />
            </Box>)
}