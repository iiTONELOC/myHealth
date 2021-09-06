import { Box, Text, Card, CardBody, RangeInput } from 'grommet';
import { RiHeartPulseFill as PulseIcon } from 'react-icons/ri';
function RenderInputs(props) {
    return (
        <Box
            key={props.name}
            fill
        >
            <Text
                size="large"
                weight='bold'
                alignSelf='start'
                style={{ marginTop: '10px', textShadow: `1px 1px 1px black`, letterSpacing: '1px' }}
            >
                {props.name}
            </Text>
            <input
                className='customInput'
                type='number'
                style={{ marginTop: '15px', outlineColor: 'accent-1' }}
                {...props}
            />
            <Text
                size="medium"
                weight="bold"
                alignSelf='start'
                style={{ marginTop: '15px' }}
            >
                {/* {props.value} */}
            </Text>
        </Box>
    );
};

export default function BloodPressureForm({ systolic, diastolic, systolicHandler, diastolicHandler, setValue, value }) {
    const inputData = [
        { name: `Pulse`, min: '40', max: '150', onChange: (e) => setValue(e), value: value },
        { name: `Systolic Pressure`, min: '60', max: '210', onChange: (e) => systolicHandler(e), value: systolic },
        { name: 'Diastolic Pressure', min: '60', max: '150', onChange: (e) => diastolicHandler(e), value: diastolic },
    ];
    return (
        <Card
            background='dark_1'
            elevation='none'
            alignSelf='center'
            width='450px'
        >
            <CardBody pad="small">
                <Box
                    gap="small"
                    pad="small"
                    size="small"
                    align="center"
                >
                    <Box
                        background='dark'
                        align='center'
                        style={{ padding: '10px', borderRadius: '50%' }}
                    >
                        <PulseIcon size='50' color='#6FFFB0' />
                    </Box>
                    <Box
                        justify='center'
                        alignSelf='center'
                        align='center'
                        width='90%'
                        pad='medium'
                        margin='-15px'
                    >
                        {inputData.map(el => (<RenderInputs key={el.name} {...el} />))}
                    </Box>
                </Box>
            </CardBody>
        </Card>
    );
};