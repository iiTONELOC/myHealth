import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { Box, Text } from 'grommet'
import { GET_ME } from '../utils/queries';
import { HistoryList } from '../components/HistoryList';


export default function UserHistory() {
    const [view, setView] = useState('List')
    const { loading, data, error } = useQuery(GET_ME);
    if (loading) {
        return 'Loading Please wait';
    };
    if (error) {
        return `${error.message}`;
    };
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };
    const formatTime = (date) => {
        const time = new Date(date).toLocaleTimeString();
        return time
    };
    const userHistory = data.me.dailyReadings.map((el, idx) => (
        {
            key: idx,
            date: formatDate(el.dateTime),
            time: formatTime(el.dateTime),
            pulse: el.pulse,
            bloodPressure: `${el.systolic}/${el.diastolic}`
        }
    )).sort((a, b) => a.date - b.date);
    return (
        <Box
            margin={{ top: '20px' }}
            justify='start'
            overflow={{ horizontal: 'hidden', vertical: 'auto' }}
            pad="xsmall"
            width='90vw'
        >
            <Text
                size='xxlarge'
                alignSelf='center'
            >
                Health History
            </Text>
            <Box
                fill='horizontal'
                direction='row'
                justify='end'
                gap='large'
            >
                <Text onClick={() => setView('List')}>List</Text> <Text onClick={() => setView('Chart')}>Chart</Text>
            </Box>
            <Box
                alignSelf='center'
                justify='center'
                align='center'
                pad='large'
                direction='column'
                overflow={{ horizontal: 'hidden', vertical: 'auto' }}
                fill
            >
                {data && (
                    view === 'List' ? (<HistoryList userHistory={userHistory} />) : ('Coming Soon')
                )
                }
            </Box>
        </Box>
    );
};