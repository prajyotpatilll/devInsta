import express from 'express'
import { addproject, addskills, deleteProject, editProject, editprofile, getprofile, loginUser, registerUser, showAllProjects, showskills } from '../controller/usercontroll.js'
import authuser from '../middleware/authuser.js'
import upload from '../middleware/multer.js'
const useRouter = express.Router()

useRouter.post('/register', registerUser)
useRouter.post('/login', loginUser)
useRouter.get('/profile', authuser, getprofile)
useRouter.post('/editprofile', upload.fields([
  { name: 'profile_photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]), authuser, editprofile)
useRouter.post('/addproject', upload.single('image'), authuser, addproject)
useRouter.post('/editproject', authuser, editProject)
useRouter.post('/deleteproject', authuser, deleteProject)
useRouter.post('/addskills', authuser, addskills)
useRouter.get('/showskills', authuser, showskills)
useRouter.get('/showallprojects', authuser, showAllProjects)
export default useRouter