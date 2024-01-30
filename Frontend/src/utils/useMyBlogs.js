import { useEffect, useState } from "react"
import axios from "axios"
const useMyBlogs = ()=>{
    const [data,setdata] = useState(null)
    const [err,seterr] = useState(null)
    useEffect(()=>{
        fetchData = async()=>{
            try{
                const token = sessionStorage.getItem('jwtToken')
                const response = await axios.get('http://localhost:3000/getmyblogs/',
            {
                headers:{
                    'Authorization': token,
                    'Content-Type':'application/json'
                }
            })
            if (response.status !== 200) {
                throw new Error("Something went wrong");
              }
                setdata(response.data)
            }
            catch(error){
                seterr("Something went wrong")
            }
        }
        fetchData()
    },[])
    return {data,err}
}

export default useMyBlogs