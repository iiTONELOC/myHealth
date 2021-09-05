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
            background='dark_2'
        >
            <Box
                fill='horizontal'
                justify='start'
                align='center'
                direction='column'
                flex='shrink'
            >
                <Heading
                    level='2'
                    margin={{ top: '-1px' }}
                    style={{ padding: '5px' }}
                >
                    Blood Pressure Tracker
                </Heading>
                <DailyReadingForm />
            </Box>
        </Box>
    );
};