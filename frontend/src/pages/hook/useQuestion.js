import {useState, useEffect} from 'react'
import axios from 'axios'
const useQuestion =(questionId)=>{
    const [questions, setQuestions] = useState([])
    const [titles, setTitles] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getQuestions = async(userId,questionId)=>{
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${userId}/${questionId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false)
        setQuestions(result.data)
        return result
    }
    const getQuestionTitles = async()=>{
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/titles`, {
            headers: { 'Content-Type': 'application/json' },
        });
        setTitles(result.data)
        setLoading(false)
    }
    const submitAnswer = async(userId,questionId,res)=>{
        console.log(res)
        setLoading(true)
        await axios.post(`${process.env.REACT_APP_BASE_URL}/question/submit/${userId}/${questionId}`,res)
        setLoading(false)
    }
    const getAnswer = async(userId, questionId)=>{
    }
    useEffect(()=>{
        // getQuestionTitles()
    },[])
    useEffect(()=>{
    },[questionId])
    const createQuestion = (payload)=>{

    }
    return {
        isLoading,
        questions,
        titles,
        getQuestions,
        createQuestion,
        submitAnswer,
        getQuestionTitles,
        getAnswer
    }
}
export default useQuestion