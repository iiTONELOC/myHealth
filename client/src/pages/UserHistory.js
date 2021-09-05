import { useQuery } from '@apollo/client';
import { Box, Text } from 'grommet'
import { GET_ME } from '../utils/queries';
import { HistoryList } from '../components/HistoryList';

export default function UserHistory() {
    const { loading, data, error } = useQuery(GET_ME);
    if (loading) {
        return 'Loading Please wait';
    };
    if (error) {
        return `${error.message}`;
    };
    return (
        <Box
            margin={{ top: '20px' }}
            justify='start'
            overflow={{ horizontal: 'hidden', vertical: 'auto' }}
            pad="xsmall"
            fill
        >
            <Text
                size='xxlarge'
                alignSelf='center'
            >
                Health History
            </Text>
            <Box
                alignSelf='center'
                justify='center'
                align='center'
                pad='large'
                direction='column'
                overflow={{ horizontal: 'hidden', vertical: 'auto' }}
                fill
            >
                {data && (<HistoryList {...data} />)}
            </Box>
        </Box>
    );
};