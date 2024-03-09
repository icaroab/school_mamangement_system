import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const QuestionForm = () => {
    const [questions, setQuestions] = useState([{
        question: "",
        answer:[{
            id:1,
            desc:'',
            isTrue:false
        },
        {
            id:2,
            desc:'',
            isTrue:false
        },
        {
            id:3,
            desc:'',
            isTrue:false
        },
        {
            id:4,
            desc:'',
            isTrue:false
        }]
    }])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const titleId = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)
    const handleQuestionNameChange = (index) => (event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswer = (index, id) => (event) => {
        const newQuestions = [...questions]
        const newAnswer = {
            id:id+1,
            desc:event.target.value,
            isTrue:false
        }
        newQuestions[index]['answer'][id]=newAnswer
        setQuestions(newQuestions);
    };
    const handleAnswerCheck = (index, id) => event => {
        const newQuestions = [...questions]
        newQuestions[index]['answer'][id].isTrue=event.target.checked
        setQuestions(newQuestions);
    }
    const handleAddQuestion = () => {
            setQuestions([...questions, {
                question: "",
                answer:[{
                    id:1,
                    desc:'',
                    isTrue:false
                },
                {
                    id:2,
                    desc:'',
                    isTrue:false
                },
                {
                    id:3,
                    desc:'',
                    isTrue:false
                },
                {
                    id:4,
                    desc:'',
                    isTrue:false
                }]
                
            }]);

        // }
    };

    const handleRemoveQuestion = (index) => () => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const fields = {
        titleId,
        questions
        // adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };


    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/questions");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Box onSubmit={submitHandler} component="form" sx={styles.boxField}>
            <Box mb={2}>
                <Typography variant="h6" >Add Questions</Typography>
            </Box>
            <Grid container spacing={2}>
                {questions.map((question, qId) => (
                    <React.Fragment key={qId}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Question 1"
                                variant="outlined"
                                value={question.question}
                                onChange={handleQuestionNameChange(qId)}
                                sx={styles.inputField}
                                // error={!!questionError}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                new Array(4).fill(0).map((_, id) => <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField
                                        fullWidth
                                        label={`Answer${id}`}
                                        variant="outlined"
                                        value={question[`Answer${id + 1}`]?.desc}
                                        onChange={handleAnswer(qId, id)}
                                        sx={styles.inputField}
                                        // error={!!answersError[id]}
                                        required
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            onChange={handleAnswerCheck(qId, id)}
                                            {...label}
                                            sx={{ marginLeft: '10px' }}
                                        />}></FormControlLabel>

                                </div>)
                            }


                        </Grid>

                        <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end">
                                {qId === 0 ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddQuestion}
                                        sx={styles.inputField}
                                    >
                                        Add Question
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveQuestion(qId)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit" disabled={loader}>
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Box>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Grid>
        </Box>
    );
}

export default QuestionForm

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
        marginTop: '10px'
    },
    boxField: {
        paddingRight: '10px',
        paddingLeft: '10px',
        paddingTop: '20px'
    }
};