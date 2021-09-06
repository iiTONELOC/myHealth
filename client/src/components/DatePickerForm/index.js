
import { Box, Text } from 'grommet';
import { FaCalendarPlus as CalendarIcon } from 'react-icons/fa'
export default function DatePickerForm({ onDateChange, onTimeChange }) {


    return (
        <Box
            background='dark_1'
            elevation='none'
            height='300px'
            width='250px'
            round='small'
            direction='column'
            justify='evenly'
            alignSelf='center'
        >
            <Box
                align="center"
                fill
                pad='xsmall'
            >
                <Box
                    background='dark'
                    align='center'
                    style={{ padding: '10px', borderRadius: '50%' }}
                >
                    <CalendarIcon size='50' color='#6FFFB0' />
                </Box>
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
                        <input className='customInput' type='date' onChange={onDateChange} />
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
                        <input className='customInput' type='time' onChange={onTimeChange} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};