import { useState } from 'react';
import { Box, Text } from 'grommet';
import { useMutation } from '@apollo/client';
import BloodPressureForm from "../BloodPressureForm";
import DatePickerForm from "../DatePickerForm";
import CustomButton from '../CustomButton';
import { ADD_DAILY_RD } from '../../utils/mutations';
import './input.css'
export default function DailyReadingForm() {
    const initValue = 60;
    const initSystolic = 120;
    const initDiastolic = 80;
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(initValue);
    const [systolic, setSystolic] = useState(initSystolic);
    const [diastolic, setDiastolic] = useState(initDiastolic);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [message, setMessage] = useState(false);
    const [showDatePicker, setDatePicker] = useState(false);
    const [addDailyReading] = useMutation(ADD_DAILY_RD);
    function isInitial() {
        if (count !== 0 || value !== initValue || systolic !== initSystolic || diastolic !== initDiastolic) {
            return false;
        } else {
            return true;
        };
    };
    const showButton = {
        isInitial: isInitial(),
    };
    const Value = (e) => {
        return e.target?.value || e || '';
    };
    const systolicHandler = (e) => {
        setSystolic(Value(e));
    };
    const diastolicHandler = (e) => {
        setDiastolic(Value(e));
    };
    const valueHandler = (e) => {
        setValue(Value(e));
    };
    const bloodPressureFormData = {
        systolic, diastolic, systolicHandler, diastolicHandler, showDatePicker, value, setValue: (e) => valueHandler(e.target.value)
    };
    const setInitial = () => {
        setValue(initValue);
        setSystolic(initSystolic);
        setDiastolic(initDiastolic);
        setDatePicker(false);
        if (count > 0) setCount(0);
    };
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };
    const createNewEntry = async () => {
        // build dateTime obj
        // needs timestamp format for db
        const dailyVars = {
            pulse: parseFloat(value),
            systolic: parseFloat(systolic),
            diastolic: parseFloat(diastolic),
            dateTime: date && time ? new Date(`${date}T${time}`).getTime() : Date.now()
        }
        return addDailyReading({ variables: { ...dailyVars } });
    };
    const handleMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(false);
        }, 3000)
    };
    const SubmitAndReset = () => {
        const shouldRefresh = createNewEntry();
        if (shouldRefresh) {
            setInitial();
            handleMessage('Daily Entry successfully added!');
        };
    };
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
            SubmitAndReset();
        };
    };
    const cancelHandler = (e) => {
        e.preventDefault();
        return setInitial();
    }
    const btnData = {
        name: 'Submit Entry', onClick: (e) => entryHandler(e),
    };
    const CancelData = {
        name: 'Cancel', onClick: (e) => cancelHandler(e), colorHover: 'status-critical'
    };
    return (
        <>
            <Box
                fill
                direction='column'
                justify='center'
                align='center'
                pad='small'
            >
                {message && (
                    <Text
                        color='accent-1'
                        size='large'
                        style={{
                            textShadow: '1px 1px 1px black',
                            marginBottom: '10px'
                        }}
                    >
                        {message}
                    </Text>
                )}
                <Box
                    fill
                    direction='row'
                    justify='center'
                    alignContent='center'
                    margin={{ bottom: '5px' }}
                >
                    <BloodPressureForm {...bloodPressureFormData} />
                    {showDatePicker && (
                        <DatePickerForm
                            onDateChange={(e) => handleDateChange(e)}
                            onTimeChange={(e) => handleTimeChange(e)}
                        />)}
                </Box>
                <Box
                    fill='horizontal'
                    direction='row'
                    justify='center'
                    margin={{ top: '10px' }}
                >
                    <Box
                        alignSelf='center'
                        justify='center'
                        direction='row'
                        width='449px'
                        margin={{ left: '10px' }}
                    ><Box
                        justify='center'
                        fill
                        direction='row'
                        gap='medium'
                    >
                            <CustomButton {...btnData} />
                            {showButton.isInitial !== true && (
                                <CustomButton {...CancelData} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};