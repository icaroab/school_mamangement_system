import { useState, useEffect } from 'react'
import axios from 'axios'
const useStudent = (sId) => {
    const [students, setStudent] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [myTests, setMyTests] = useState([])
    const getStudents = async () => {
        setLoading(true)
        try {
            console.log('sssssss')
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/students`)
            console.log(result)
            if (result.data) {
                setStudent(result.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    const getTestsByStudent = async (sId) => {
        console.log('sdfsdf')
        setLoading(true)
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/students/${sId}/tests`)
            if(result.data){
                setMyTests(result.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
   
    useEffect(() => {
        if (sId) {
            getTestsByStudent(sId)
        }else{
            getStudents()

        }
    }, [sId])
    return {
        isLoading,
        students,
        myTests
    }
}
export default useStudent