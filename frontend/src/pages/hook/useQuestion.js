import {useState, useEffect} from 'react'
import axios from 'axios'
const useQuestion =(id)=>{
    const [questions, setQuestions] = useState([])
    const [titles, setTitles] = useState([])
    const [isLoading, setLoading] = useState(false)
    const getQuestions = async(id)=>{
        setLoading(true)
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${id}`, {
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
    useEffect(()=>{
        getQuestionTitles()
    },[])
    useEffect(()=>{
        if(id!==undefined){

            getQuestions(id)
        }
    },[id])
    const createQuestion = (payload)=>{

    }
    return {
        isLoading,
        questions,
        titles,
        getQuestions,
        createQuestion
    }
}
export default useQuestion