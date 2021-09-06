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
            onMouseOver={() => handleActive()}
            onMouseOut={() => handleActive()}
            background={active ? props.colorHover ? props.colorHover : 'status-ok' : props.color ? props.color : 'brand'}
            onClick={onClick}
            style={{ padding: '12px', borderRadius: '8px' }}
        >
            <Text alignSelf='center' color={'white'} style={{ textShadow: `2px 1px 1px black`, letterSpacing: '1px' }}>{name}</Text>
        </Box>
    );
};