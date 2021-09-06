import { Box, Heading } from 'grommet';
import DailyReadingForm from '../components/DailyReadingForm';

export default function UserHome() {
    return (
        <Box
            fill
            justify='center'
            align='start'
            direction='row'
            pad='xsmall'
            overflow={{ horizontal: 'hidden', vertical: 'auto' }}
        >
            <Box
                fill='horizontal'
                justify='start'
                align='center'
                direction='column'
                flex='shrink'
                height={{ min: '91vh' }}
            >
                <Heading
                    level='2'
                    margin={{ top: '-1px' }}
                    style={{ padding: '5px', textShadow: `1px 1px 1px black` }}
                >
                    Blood Pressure Tracker
                </Heading>
                <DailyReadingForm />
            </Box>
        </Box>
    );
};