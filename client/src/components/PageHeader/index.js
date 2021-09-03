import { Box, Nav } from 'grommet';
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
                <Box >
                    Login
                </Box>
                <Box >
                    Signup
                </Box>
            </Box>
        </Box>
    )
}