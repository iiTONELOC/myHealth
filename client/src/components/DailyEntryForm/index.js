import { useState } from 'react';
import { Box, Text } from 'grommet';
import { useMutation } from '@apollo/client';
import PulseForm from "../PulseForm";
import BloodPressureForm from "../BloodPressureForm";
import DatePickerForm from "../DatePickerForm";
import CustomButton from '../CustomButton';
import { ADD_BP, ADD_DAILY_RD } from '../../utils/mutations';


export default function DailyEntryForm() {
    const initValue = 60;
    const initSystolic = 120;
    const initDiastolic = 80;
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(initValue);
    const [systolic, setSystolic] = useState(initSystolic);
    const [diastolic, setDiastolic] = useState(initDiastolic);
    const [date, setDate] = useState(false);
    const [message, setMessage] = useState(false);
    const [showDatePicker, setDatePicker] = useState(false);
    const [addBloodPressure] = useMutation(ADD_BP);
    const [addDailyReading] = useMutation(ADD_DAILY_RD);
    function isInitial() {
        if (count !== 0 || value !== initValue || systolic !== initSystolic || diastolic !== initDiastolic) {
            return false
        } else {
            return true
        }
    }
    const showButton = {
        isInitial: isInitial()
    }
    const systolicHandler = (e) => {
        e.preventDefault()
        setSystolic(e.target.value)

    }
    const diastolicHandler = (e) => {
        setDiastolic(e.target.value)

    }
    const bpfd = {
        systolic, diastolic, systolicHandler, diastolicHandler, showDatePicker
    }
    const setInitial = () => {
        setValue(initValue);
        setSystolic(initSystolic);
        setDiastolic(initDiastolic);
        setDatePicker(false);
        if (count > 0) setCount(0);
    }
    const handleDateChange = (e) => {
        const timeStamp = new Date(e.target.value).getTime();
        setDate(timeStamp);
    }
    const createNewEntry = async () => {
        // grab BP first and create BP entry
        // grab returned ID and create a new DailyEntry with the BP ID and pulse

        const bpData = await addBloodPressure({ variables: { systolic: parseFloat(systolic), diastolic: parseFloat(diastolic) } });
        if (bpData) {
            const { data } = bpData;
            const ID = data.addBloodPressure._id;
            // create new Daily
            if (ID) {
                const dailyVars = {
                    pulse: parseFloat(value),
                    bloodPressure: ID,
                    dateTime: date ? date : Date.now()
                }
                return addDailyReading({ variables: { ...dailyVars } });
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const handleMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(false)
        }, 3000)
    }
    const SubmitAndReset = () => {
        const shouldRefresh = createNewEntry();
        if (shouldRefresh) {
            setInitial();
            handleMessage('Daily Entry successfully added!')
        }
    }
    const entryHandler = (e) => {
        if (count < 1) {
            const useDefault = window.confirm('Hit ok to use current date and time, hit cancel to input');
            if (useDefault) {
                SubmitAndReset();
            } else {
                setCount(1);
                setDatePicker(true);
            }
        } else {
            SubmitAndReset()
        }
    };
    const cancelHandler = (e) => {
        e.preventDefault()
        return setInitial()
    }
    const btnData = {
        name: 'Submit Entry', onClick: (e) => entryHandler(e),
    };

    const CancelData = {
        name: 'Cancel', onClick: (e) => cancelHandler(e), color: 'red', colorHover: 'black'
    }

    return (
        <>
            <Box
                fill
                direction='column'
                justify='center'
                align='center'
                pad='small'
            >
                {message && (<Text color='accent-1' size='large' style={{ textShadow: '1px 1px 1px black', marginBottom: '10px' }}>{message}</Text>)}
                <Box fill direction='row' justify='center' margin={{ bottom: '5px' }}>
                    <PulseForm value={value} set={(e) => setValue(e.target.value)} />
                    <BloodPressureForm {...bpfd} />
                    {showDatePicker && (<DatePickerForm onChange={(e) => handleDateChange(e)} />)}
                </Box>
                <Box
                    fill='horizontal'
                    direction='row'
                    justify='center'
                    alignContent='center'
                >
                    <Box
                        width='150px'
                        alignSelf='center'
                        margin={{ top: '5px', right: '15px' }}
                        direction='row'
                    >
                        <CustomButton {...btnData} />
                    </Box>
                    {showButton.isInitial !== true && (
                        <Box
                            width='150px'
                            alignSelf='center'
                            margin={{ top: '5px', right: '15px' }}
                            direction='row'
                        >
                            <CustomButton {...CancelData} />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}