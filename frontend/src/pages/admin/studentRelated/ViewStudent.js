import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getSubjectList } from '../../../redux/sectionRelated/sectionHandle';
import { Box, Button, Card, CardContent, CardActions, Typography, Container } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';

import useStudent from '../../hook/useStudent';
import DoneIcon from '@mui/icons-material/Done';
const ViewStudent = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const { userDetails} = useSelector((state) => state.user);

    const studentID = params.id
    const { myTests } = useStudent(studentID)

    useEffect(() => {
        if (userDetails && userDetails.sectionName && userDetails.sectionName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sectionName._id, "ClassSubjects"));
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
                                    {
                                        item.answer.map((ans, ansId) => {
                                            return <div key={ansId}>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {ans.question}
                                                </Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                <Typography>Q:</Typography>
                                                    {
                                                        ans.answer.map((answerItem, index) => {
                                                            return <GradeIcon key={index} sx={answerItem.isTrue ? styles.starGold : styles.starGrey} />
                                                        })
                                                    }
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                <Typography>A:</Typography>

                                                    {
                                                        ans.answer.map((answerItem, index) => {
                                                            return <DoneIcon key={index} sx={answerItem.isTrue && answerItem.isChecked ? styles.starGold :!answerItem.isTrue&&answerItem.isChecked?styles.starRed:styles.starGrey} />
                                                        })
                                                    }
                                                </Box>

                                            </div>
                                        })
                                    }
                                </CardContent>
                                <CardActions>
                                    <Link to={`/questions/${item.userId}/${item.sectionId}`}><Button size="small">Details</Button></Link>

                                </CardActions>
                            </Card>
                        })
                    }

                </Container></Container> : <Typography>No data</Typography>
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
        padding: '20px'
        // justifyContent:'space-between'
    },
    starGold: {
        color: '#FFDF00'
    },
    starGrey: {
        color: '#d9d9d9'
    },
    starRed: {
        color: '#f75252'
    }
}