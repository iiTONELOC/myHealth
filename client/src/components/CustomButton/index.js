import { Box } from 'grommet';
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
            background={active ? 'accent-1' : 'gray'}
            onClick={onClick}
        >
            {name}
        </Box>
    );
};