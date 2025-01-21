import express from 'express'
import { addproject, addskills, alldevelopers, allusersprojects, authdev, deleteProject, editProject, editprofile, getprofile, loginUser, registerUser, selecteddev, showAllProjects, showskills } from '../controller/usercontroll.js'
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
useRouter.post('/addproject', upload.single('photo'), authuser, addproject)
useRouter.post('/editproject', authuser, editProject)
useRouter.post('/deleteproject', authuser, deleteProject)
useRouter.post('/addskills', authuser, addskills)
useRouter.get('/showskills', authuser, showskills)
useRouter.get('/showallprojects', authuser, showAllProjects)
useRouter.get('/devauth', authuser, authdev)

//

useRouter.get('/allprojects', allusersprojects)
useRouter.get('/alldevelopers', alldevelopers)
useRouter.get('/selecteddev', selecteddev)
useRouter.get('/authdev', authuser, authdev)
export default useRouter