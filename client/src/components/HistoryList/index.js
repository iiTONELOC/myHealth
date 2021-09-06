import { useState } from 'react';
import { Box, DataTable, Text } from 'grommet';

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
    const [print, setPrint] = useState(false);
    const d = DATA.me.dailyReadings.map((el, idx) => (
        {
            key: idx,
            date: el.dateTime,
            time: el.time,
            pulse: el.pulse,
            bloodPressure: `${el.systolic}/${el.diastolic}`
        }
    )).sort((a, b) => a.date - b.date);
    const handlePrint = async () => {
        setPrint(true);
        setTimeout(() => {
            window.print();
            setPrint(false);
        }, 500)
    }
    const step = 14;
    return (
        !print ? (<><Box align="center" fill >
            <DataTable
                columns={columns}
                data={d}
                step={step}
                paginate
                border={{ side: 'bottom', color: 'dark_3' }}
                pad='small'
                fill
            />
        </Box>
            {d.length > 0 &&
                (
                    <Box alignSelf='end' margin={{ top: '5px' }} onClick={handlePrint} >
                        <Text>Print History</Text>
                    </Box>
                )
            }
        </>) : (
            <>
                <DataTable
                    columns={columns}
                    data={d}
                    border={{ side: 'bottom', color: 'dark_3' }}
                    pad='medium'
                    fill
                />
            </>
        )
    );
};
