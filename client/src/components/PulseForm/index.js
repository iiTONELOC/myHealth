import { Box, Text, RangeInput } from 'grommet';
import { RiPulseLine as PulseIcon } from 'react-icons/ri'

export default function PulseForm({ value, set }) {
    return (
        <Box
            background='dark'
            elevation='none'
            height='300px'
            width='250px'
            round='small'
            direction='column'
            justify='evenly'
        >
            <Box
                align="center"
                fill
                pad='xsmall'
            >
                <PulseIcon size='65' color='red' style={{ marginTop: '10px' }} />
                <Box
                    justify='between'
                    alignSelf='center'
                    align='center'
                    direction='column'
                    fill='vertical'
                >
                    <Box
                        margin={{ top: '15px' }}
                        fill
                        justify='start'
                    >
                        <Text
                            size="medium"
                            weight="bold"
                            alignSelf='center'
                        >
                            Enter Pulse
                        </Text>
                        <RangeInput
                            style={{ marginBottom: '55px', marginTop: '22px' }}
                            min='40'
                            max='150'
                            value={value}
                            onChange={set}
                        />
                        <Text
                            size="medium"
                            weight="bold"
                            alignSelf='center'
                        >
                            {value}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}