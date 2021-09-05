import { Box, DataTable, Text } from 'grommet';
// import { RiHeartPulseFill as BpIcon } from 'react-icons/ri';
// import { RiPulseLine as PulseIcon } from 'react-icons/ri';
// import { IoMdClock as ClockIcon } from 'react-icons/io';


const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
};
const formatTime = (date) => {
    const time = new Date(date).toLocaleTimeString();
    return time
};
const renderDetail = (data) => {
    return (
        <Text size='large' alignSelf='center'>{data}</Text>
    );
};
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

export const HistoryList = (DATA) => {
    const d = DATA.me.dailyReadings.map((el, idx) => (
        {
            key: idx,
            date: el.dateTime,
            time: el.time,
            pulse: el.pulse,
            bloodPressure: `${el.systolic}/${el.diastolic}`
        }
    )).sort((a, b) => a.date - b.date);
    const step = 10;
    return (
        <Box align="center" pad="small" fill>
            <DataTable
                columns={columns}
                data={d}
                step={step}
                paginate
                border={{ side: 'bottom', color: 'dark_3' }}
                pad='medium'

            />
        </Box>
    );
};
