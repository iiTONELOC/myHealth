
import { Box, Heading } from 'grommet';
import DailyEntryForm from '../components/DailyEntryForm';


export default function UserHome() {

    return (
        /*
        need a layout container
        switches between row and column for mobile and desktop views
        container holds 
        -enter pulse component
        -enter BloodPressure component
        History component
        */

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
                {/* box that holds the components will act as a form */}
                <DailyEntryForm />
            </Box>
        </Box>
    )
}