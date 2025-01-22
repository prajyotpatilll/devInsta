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
  const [userdata, setuserdata] = useState([]);
  const [uniqid, setuniqid] = useState(null)


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

  const getmyprofile = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/profile", {
        headers: { token },
      });
      if (data.success) {
        setuserdata(data.userdata);
        setuniqid(data.userdata._id); 
        console.log(data.userdata);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    token,
    settoken,
    backendURL,
    projects,
    developers,
    userdata, 
    uniqid  
  };

  useEffect(()=>{
      getallprojects()
      getalldevelopers()
     
  },[])

  useEffect(() => {
    if(token){
      getmyprofile();
    }
    
  }, [token]);




  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvide;
