import { Box, Text } from 'grommet';
import { useState } from 'react';
export default function CustomButton(props) {
    const { name, onClick } = props
    const [active, setActive] = useState(false);
    function handleActive() {
        return setActive(!active)
    };
    return (
        <Box
            pad='small'
            round='xsmall'
            onMouseOver={() => handleActive()}
            onMouseOut={() => handleActive()}
            background={active ? props.colorHover ? props.colorHover : 'status-ok' : props.color ? props.color : 'gray'}
            onClick={onClick}
        >
            <Text alignSelf='center' color={'white'} size={active ? 'large' : 'medium'} style={{ textShadow: `1px 1px 1px black`, letterSpacing: '1px' }}>{name}</Text>
        </Box>
    );
};