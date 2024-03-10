import React, { useState, useEffect } from 'react'
// import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { Table, TableBody, TableContainer, FormControlLabel, Checkbox, TableHead, Button, TablePagination, Box, TextField, Typography, Grid } from '@mui/material';
import useQuestion from '../hook/useQuestion';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const QuestionDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { currentRole, currentUser } = useSelector(state => state.user);
    const { questions, getQuestions, submitAnswer } = useQuestion(id)
    const [myAnswer, setMyAnswer] = useState([])
    const handleCheck = (qId, id) => event => {
        const currentCheck = {
            qId: qId,
            id: id,
            isChecked: event.target.checked
        }
        let isDouble = true
        let currentAnswer = [...myAnswer]
        currentAnswer.forEach((element, index) => {
            if (element.qId == qId && element.id == id) {
                currentAnswer[index] = { ...element, isChecked: event.target.checked }
                isDouble = false
            }
        })
        if (isDouble) {
            setMyAnswer([...myAnswer, currentCheck])
        } else {
            setMyAnswer(currentAnswer)
        }
    }
    const handleSubmit = () => {
        const questionLength =questions.result.length
        let answerTemplate = []
        new Array(questionLength).fill('').forEach((_, qId) => {
            new Array(4).fill('').forEach((_, id) => {
                let trueAnswer = myAnswer.filter(item => item.id == id && item.qId == qId)[0]
                answerTemplate.push({
                    qId,
                    id,
                    isChecked: trueAnswer !== undefined ? trueAnswer.isChecked : false
                })
            })
        })
        submitAnswer(currentUser._id, id, answerTemplate)
    }

    useEffect(() => {
        getQuestions(currentUser._id, id)
    }, [currentUser._id])
    return (<Box component="div" sx={styles.boxField}>
        <Box mb={2}>{console.log(questions)}
            <Typography variant="h6" >{questions[0]?.titleId.sclassName}</Typography>
        </Box>
        <Grid container spacing={2}>
            {questions.result?.length > 0 && questions.result.map((question, qId) => (
                <React.Fragment key={qId}>
                    <Grid item xs={12}>{console.log(question)}
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={question.question}
                            sx={styles.inputField}
                            disabled
                            // outlined={currentRole == 'Admin'}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        {
                            question.answer?.length > 0 && question.answer.map((item, id) => {
                                return <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField
                                        fullWidth
                                        value={item.desc}
                                        sx={styles.inputField}
                                        disabled
                                        InputProps={{
                                            style: { color: '#3f3030', backgroundColor: questions.submitted ? (item.isTrue == item.isChecked) ? '#c0ddc0' : '#ebcdcd' : '#f5f5f5' }
                                        }}
                                        required
                                    />
                                    {
                                        (currentRole === "Admin" ? <FormControlLabel
                                            control={<Checkbox
                                                {...label}
                                                disabled={currentRole == 'Admin'}
                                                onChange={handleCheck(qId, id)}
                                                sx={{ marginLeft: '10px' }}
                                                checked={item.isTrue}
                                            />}></FormControlLabel> : !questions.submitted ? <FormControlLabel
                                                control={<Checkbox
                                                    {...label}
                                                    disabled={currentRole == 'Admin'}
                                                    onChange={handleCheck(qId, id)}
                                                    sx={{ marginLeft: '10px' }}
                                                />}></FormControlLabel> : '')
                                    }
                                </div>
                            })
                        }
                    </Grid>

                </React.Fragment>
            ))}
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" container >
            <Box display="flex" justifyContent="flex-end" sx={{ margin: '2px' }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
            {
                (!questions.submitted && currentRole !== 'Admin') && <Box display="flex" justifyContent="flex-end" sx={{ margin: '2px' }}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            }
        </Grid>

    </Box>)
}
export default QuestionDetail
const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#3f3030',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
        marginTop: '10px'
    },
    boxField: {
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '40px',
        paddingBottom: '40px'
    }
};