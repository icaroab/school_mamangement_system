import React from 'react'
// import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { Table, TableBody, TableContainer, FormControlLabel, Checkbox, TableHead, Button, TablePagination, Box, TextField, Typography, Grid } from '@mui/material';
import useQuestion from '../hook/useQuestion';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const QuestionDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { questions } = useQuestion(id)
    const { currentRole } = useSelector(state => state.user);

    return (<Box component="div" sx={styles.boxField}>
        <Box mb={2}>
            <Typography variant="h6" >{questions[0]?.titleId.sclassName}</Typography>
        </Box>
        <Grid container spacing={2}>
            {questions.length > 0 && questions[0].questions.map((question, qId) => (
                <React.Fragment key={qId}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Question 1"
                            variant="outlined"
                            value={question.question}
                            sx={styles.inputField}
                            disabled={currentRole=='Admin'}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        {
                            question.answer.length > 0 && question.answer.map((item, id) => {
                                return <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={item.desc}
                                        sx={styles.inputField}
                                        required
                                        disabled={currentRole=='Admin'}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox
                                            {...label}
                                            disabled
                                            checked={item.isTrue}
                                            sx={{ marginLeft: '10px' }}
                                        />}></FormControlLabel></div>
                            })
                        }
                    </Grid>

                </React.Fragment>
            ))}
        </Grid>
        <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Box>
            {
                currentRole!=='Admin'&&<Box display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(-1)}>
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
            color: '#838080',
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