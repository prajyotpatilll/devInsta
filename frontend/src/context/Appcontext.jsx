import { createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";


export const AppContext = createContext();

const AppContextProvide = (props) => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
  const [projects,setprojects] = useState([])
  const [developers, setdevelopers] = useState([])

  //get all priojects list
  const getallprojects = async ()=>{
    try {
      const {data} = await axios.get(backendURL + "/api/user/allprojects")
      if(data.success){
        setprojects(data.projects)
        // console.log(data.projects)
      }
      else{
        toast.error(data.error)
      }
      
    } catch (error) {
      toast.error(error.message);
    }

  }

  //get all developers list
  const getalldevelopers = async () => {
    try {
      const {data} = await axios.get(backendURL + "/api/user/alldevelopers")
      if(data.success){
        setdevelopers(data.developers)
        // console.log(data.developers)
      }
      else{
        toast.error(data.error)
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    token,
    settoken,
    backendURL,
    projects,
    developers  
  };

  useEffect(()=>{
      getallprojects()
      getalldevelopers()
  },[])


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvide;
