import { Box, DataTable, defaultProps, Heading, Meter, Text } from 'grommet';
import { RiHeartPulseFill as BpIcon } from 'react-icons/ri';
import { RiPulseLine as PulseIcon } from 'react-icons/ri';
import { IoMdClock as ClockIcon } from 'react-icons/io';


const formatDate = (date) => {
    console.log(date)
    const d = new Date(date);
    return d.toLocaleDateString()
}
const formatTime = (date) => {
    const time = new Date(date).toLocaleTimeString();
    return time
}
const renderDetail = (data) => {
    return (
        <Text>{data}</Text>
    )
}
const columns = [
    {
        property: 'date',
        header: 'Date',
        render: (date) => formatDate(date.date)
    },
    {
        property: 'time',
        header: 'Time',
        render: (time) => formatTime(time.date)
    },
    {
        property: 'pulse',
        header: 'Pulse',
        render: (data) => renderDetail(data.pulse)
    },
    {
        property: 'bloodPressure',
        header: 'Blood Pressure',
        render: (data) => renderDetail(data.bloodPressure)
    },
];


// const DATA = [

//     {
//         key: 1,
//         name: 'Ilana',
//         location: 'Bay Area',
//         date: '',
//         percent: 0,
//         paid: 0,
//     },

// ]

export const HistoryList = (DATA) => {
    const d = DATA.me.dailyReadings.map((el, idx) => (
        {
            key: idx,
            date: el.dateTime,
            time: el.time,
            pulse: el.pulse,
            bloodPressure: `${el.systolic}/${el.diastolic}`
        }
    ))
    const step = 10;
    const load = () => {
        console.log(`InfiniteScroll fires onMore after loading ${step} items`);
    };


    return (
        <Box align="center" pad="large" fill>
            <DataTable
                columns={columns}
                data={d}
                step={step}
                onMore={() => load()}
                border={{ side: 'bottom', color: 'dark_3' }}
                pad='small'
            />
        </Box>
    );

};


