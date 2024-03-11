import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, Collapse, IconButton, Table, Card, CardContent, CardActions, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import GradeIcon from '@mui/icons-material/Grade';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart'
import CustomPieChart from '../../../components/CustomPieChart'
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Popup from '../../../components/Popup';
import TableTemplate from '../../../components/TableTemplate';
import useStudent from '../../hook/useStudent';
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id
    const address = "Student"
    const { currentUser } = useSelector(state => state.user)
    const { myTests } = useStudent(studentID)

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    return (
        <>{
            myTests.length > 0 ? <Container sx={styles.container}>
                <Typography variant='h5' color={'blue'}>{myTests[0].userName}    <Typography variant='p' color={'grey'}>(Roll: {myTests[0].rollNum}) </Typography></Typography>
                <Container sx={styles.container}>
                    {
                        myTests.map((item, itemIndex) => {

                            return <Card sx={styles.card} key={itemIndex}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.section}
                                    </Typography>
                                    {/* <Typography variant="h5" component="div">
                                        Roll Number: 
                                    </Typography> */}
                                    {
                                        item.answer.map((ans, ansId) => {
                                            return <div key={ansId}>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {ans.question}
                                                </Typography>
                                                {
                                                    ans.answer.map((answerItem, index) => {
                                                        return <GradeIcon key={index} sx={answerItem.isTrue===answerItem.isChecked?styles.starGold:styles.starGrey} />
                                                    })
                                                }

                                            </div>
                                        })
                                    }
                                </CardContent>
                                <CardActions>
                                    <Link to={`/questions/${item._id}`}><Button size="small">Learn More</Button></Link>
                                    
                                </CardActions>
                            </Card>
                        })
                    }

                </Container></Container>:<Typography>No data</Typography>
        }

        </>
    )
}

export default ViewStudent

const styles = {
    attendanceButton: {
        marginLeft: "20px",
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    },
    styledButton: {
        margin: "20px",
        backgroundColor: "#02250b",
        "&:hover": {
            backgroundColor: "#106312",
        }
    },
    card: {
        width: '32%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '5px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding:'20px'
        // justifyContent:'space-between'
    },
    starGold: {
        color: '#FFDF00'
    },
    starGrey: {
        color: '#a7a0a0'
    }
}