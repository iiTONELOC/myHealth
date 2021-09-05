
import { Box, Text } from 'grommet';
import { FaCalendarPlus as CalendarIcon } from 'react-icons/fa'
export default function DatePickerForm({ onDateChange, onTimeChange }) {


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
                <CalendarIcon size='50' color='red' style={{ marginTop: '20px' }} />
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
                            Enter Date
                        </Text>
                        <input type='date' onChange={onDateChange} />
                    </Box>

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
                            Enter Time
                        </Text>
                        <input type='time' onChange={onTimeChange} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}