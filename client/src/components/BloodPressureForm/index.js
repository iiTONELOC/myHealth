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
                style={{ marginTop: props.name === 'Diastolic Pressure' ? '10px' : null }}
            >
                {props.name}
            </Text>
            <RangeInput
                style={{ marginBottom: '15px', marginTop: '10px' }}
                {...props}
            />
            <Text
                size="medium"
                weight="bold"
                alignSelf='center'
            >
                {props.value}
            </Text>
        </Box>
    );
};

export default function BloodPressureForm({ systolic, diastolic, systolicHandler, diastolicHandler, showDatePicker }) {
    const rangeData = [
        { name: `Systolic Pressure`, min: '60', max: '210', onChange: (e) => systolicHandler(e), value: systolic },
        { name: 'Diastolic Pressure', min: '60', max: '150', onChange: (e) => diastolicHandler(e), value: diastolic }
    ];
    return (
        <Card
            background='dark'
            elevation='none'
            height='300px'
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