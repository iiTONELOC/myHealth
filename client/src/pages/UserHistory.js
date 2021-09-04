import { useQuery } from '@apollo/client';
import { Box, Grid, Text } from 'grommet'
import { GET_ME } from '../utils/queries';
import { RiHeartPulseFill as BpIcon } from 'react-icons/ri';
import { RiPulseLine as PulseIcon } from 'react-icons/ri';
import { IoMdClock as ClockIcon } from 'react-icons/io';
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString()
}
const formatTime = (date) => {
    const time = new Date(date).toLocaleTimeString();
    return time
}
export default function UserHistory() {
    // query user's info 
    // const userID = window.location.pathname.split('/')[2];
    const { loading, data, error } = useQuery(GET_ME);

    if (loading) {
        return 'Loading Please wait'
    }
    if (error) {
        return `${error.message}`
    }
    // need to make own component and refactor
    const RenderDailyList = () => {
        if (data) {
            const { me } = { ...data };
            const { dailyReadings } = me;
            return (dailyReadings ? dailyReadings.map(reading => (
                <Box background='dark_1' pad='xsmall' key={reading._id} round='small' justify='start' alignContent='center' direction='column' height={{ min: '250px' }}>
                    <Box justify='center' alignContent='center' background='dark_2' style={{ borderRadius: '8px 8px 0px 0px' }} pad='small'>
                        <p style={{ textDecorationLine: 'underline', textDecorationColor: '#6FFFB0', fontSize: '20px', alignSelf: 'center' }}> {formatDate(reading.dateTime)} </p>

                    </Box>
                    <Box
                        margin={{ top: '15px' }}
                        justify='evenly'
                        direction='column'
                        fill
                    >
                        {/* REFACTOR THIS */}
                        <Box pad='xsmall' justify='between' direction='row' width='85%' alignSelf='center'>
                            <ClockIcon color='gray' size='38' />  <Text size='medium'>{formatTime(reading.dateTime)}</Text>
                        </Box>
                        <Box pad='xsmall' justify='between' direction='row' width='85%' alignSelf='center'>
                            <BpIcon color='red' size='35' />   <Text size='large'>{reading.bloodPressure.systolic} / {reading.bloodPressure.diastolic}</Text>
                        </Box>
                        <Box pad='xsmall' justify='between' direction='row' width='85%' alignSelf='center'>
                            <PulseIcon color='green' size='35' /> <Text size='large'>{reading.pulse}</Text>
                        </Box>

                    </Box>
                </Box>
            )) : 'Add some daily readings!'
            )
        } else {
            return `Loading`
        }

    }
    return (
        <Box
            margin={{ top: '20px' }}
            justify='center'
            overflow={{ horizontal: 'hidden', vertical: 'hidden' }}
            pad="xsmall"
            fill
        >
            <Box
                alignSelf='center'
                justify='center'
                width='100%'
                overflow={{ horizontal: 'hidden', vertical: 'scroll' }}
                pad='xsmall'
            >
                <Text size='xxlarge' alignSelf='center' margin={{ top: '20px' }}>Health History</Text>
                <Grid fill columns='small' gap='small' pad='small' >
                    <RenderDailyList />
                </Grid>
            </Box>
        </Box>
    )
}