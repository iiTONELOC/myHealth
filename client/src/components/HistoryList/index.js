import { useState } from 'react';
import { Box, DataTable, Text } from 'grommet';

const renderDetail = (data) => {
    return (
        <Text size='large' alignSelf='center'>{data}</Text>
    );
};
const columns = [
    {
        property: 'date',
        header: 'Date',

    },
    {
        property: 'time',
        header: 'Time',

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

export const HistoryList = ({ userHistory }) => {
    const [print, setPrint] = useState(false);
    const d = userHistory
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
