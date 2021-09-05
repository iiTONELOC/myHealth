import { Box, Text, Card, CardBody, RangeInput } from 'grommet';
import { RiHeartPulseFill as PulseIcon } from 'react-icons/ri';
function RangeInputs(props) {
    return (
        <Box
            key={props.name}
            fill
        >
            <Text
                size="medium"
                weight="bold"
                alignSelf='center'
                style={{ marginTop: '10px' }}
            >
                {props.name}
            </Text>
            <input
                type='number'
                style={{ marginTop: '15px', outlineColor: 'accent-1' }}
                {...props}
            />
            <Text
                size="medium"
                weight="bold"
                alignSelf='center'
                style={{ marginTop: '15px' }}
            >
                {props.value}
            </Text>
        </Box>
    );
};

export default function BloodPressureForm({ systolic, diastolic, systolicHandler, diastolicHandler, setValue, showDatePicker, value }) {
    const rangeData = [
        { name: `Pulse`, min: '40', max: '150', onChange: (e) => setValue(e), value: value },
        { name: `Systolic Pressure`, min: '60', max: '210', onChange: (e) => systolicHandler(e), value: systolic },
        { name: 'Diastolic Pressure', min: '60', max: '150', onChange: (e) => diastolicHandler(e), value: diastolic }
    ];
    return (
        <Card
            background='dark'
            elevation='none'
            alignSelf='center'
            width='450px'
            margin={{ left: '13px', right: showDatePicker ? '13px' : null }}
        >
            <CardBody pad="small">
                <Box
                    gap="small"
                    pad="small"
                    size="small"
                    align="center"
                >
                    <PulseIcon size='55' color='red' />
                    <Box
                        justify='center'
                        alignSelf='center'
                        align='center'
                        width='90%'
                        pad='medium'
                        margin='-15px'
                    >
                        {rangeData.map(el => (<RangeInputs key={el.name} {...el} />))}
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
};