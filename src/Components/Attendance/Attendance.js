import { Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttendanceTable } from './attendanceTable';


const hrUser=JSON.parse(localStorage.getItem('hr_user'));

const Attendance = () => {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [attendances, setAttendances] = useState([]);
    const {username} = useParams  ();

    const getAttendances = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://127.0.0.1:80/employee/details/${username}`, 
            {
              headers: { Authorization: `Bearer ${hrUser.access}` },
            });
            
            setAttendances(response.data['attendances'])
          } catch (error) {
            setErrMsg('An error occurred while editing employee.');
        }
        setLoading(false)
      }
      useEffect(() => {
        getAttendances()
      }, []);
    return (
        <div>
            <h2>{username}</h2>
            <AttendanceTable attendances={attendances}/>
            <Snackbar
            open={!!errMsg}
            autoHideDuration={3000}
            onClose={() => {setErrMsg("")}}
            message={errMsg}
            />
        </div>
    );
}

export default Attendance;