import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import userModel from "../models/usermodel.js"
import nodemailer from "nodemailer"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing details 1" })
        }

        if (!validator.isEmail) {
            return res.json({ success: false, message: "enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "enter strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const userdata = {
            name,
            email,
            password: hashedpassword
        }

        const newUser = new userModel(userdata)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECREATE_TOKEN)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        if (!user.password) {
            return res.json({ success: false, message: "Password is not set for this user" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECREATE_TOKEN);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credential" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getprofile = async (req, res) => {

    try {

        const { userid } = req.body
        const userdata = await userModel.findById(userid).select('-password')

        res.json({ success: true, userdata })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

};

const editprofile = async (req, res) => {
    try {
        const {
            userid,
            name,
            role,
            description,
            gender,
            phone,
            dob,
            address,
            skills,
            education,
            linden,
            intagram,
            github,
            exprience
        } = req.body;

        const files = req.files; // Handling multiple files via multer

        if (!userid || !name || !phone || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields for update",
            });
        }

        // Build update object
        const updates = {
            name,
            phone,
            address,
            dob,
            gender,
            role,
            description,
            skills,
            linden,
            intagram,
            github,
            exprience
        };

        // Handle education fields
        if (education) {
            updates.education = {
                degreename: education.degreename || "",
                field: education.field || "",
                college: education.college || "",
                startyear: education.startyear || "",
                completeyear: education.completeyear || "present"
            };
        }

        // Function to handle file uploads to Cloudinary
        const uploadToCloudinary = async (file, resourceType = "image") => {
            try {
                const upload = await cloudinary.uploader.upload(file.path, {
                    resource_type: resourceType
                });
                return upload.secure_url;
            } catch (error) {
                throw new Error(`Error uploading ${resourceType}: ${error.message}`);
            }
        };

        // Handle profile_photo upload
        if (files?.profile_photo) {
            try {
                updates.profile_photo = await uploadToCloudinary(files.profile_photo[0], "image");
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading profile photo",
                });
            }
        }

        // Handle resume upload
        if (files?.resume) {
            try {
                updates.resume = await uploadToCloudinary(files.resume[0], "auto"); // Auto-detect file type
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading resume",
                });
            }
        }

        // Update user in the database
        await userModel.findByIdAndUpdate(userid, updates, { new: true });

        res.json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            success: false,
            message: "Error updating profile: " + error.message,
        });
    }
};



const addproject = async (req, res) => {
    try {
        const { userid, name, technologies, github_link, live_preview_link } = req.body;
        const photo = req.file

        if (!name || !technologies || !github_link) {
            return res.json({
                success: false,
                message: 'Missing required fields: userId, name, technologies, or github_link',
            });
        }

        const user = await userModel.findById(userid);

        const isDuplicate = user.projects.some((project) => project.name === name);
        if (isDuplicate) {
            return res.status(400).json({
                success: false,
                message: `A project with the name "${name}" already exists.`,
            });
        }

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const imageUpload = await cloudinary.uploader.upload(photo.path, { resource_type: "image" })
        const imageurl = imageUpload.secure_url

        const newProject = {
            name,
            photo: imageurl,
            technologies,
            github_link,
            live_preview_link: live_preview_link || '',

        };

        user.projects.push(newProject);

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Project added successfully',
            project: newProject,
        });
    } catch (error) {
        console.error('Error adding project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const editProject = async (req, res) => {
    try {
        const { userid, projectId, name, photo, technologies, github_link, live_preview_link } = req.body;

        // Validate required fields
        if (!projectId) {
            return res.json({
                success: false,
                message: 'Missing required fields: userid or projectId',
            });
        }

        // Find the user by ID
        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Find the project in the user's projects array
        const project = user.projects.id(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Update project fields if provided
        if (name) project.name = name;
        if (photo) project.photo = photo;
        if (technologies) project.technologies = technologies;
        if (github_link) project.github_link = github_link;
        if (live_preview_link) project.live_preview_link = live_preview_link;


        // Save the updated user document
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            project,
        });
    } catch (error) {
        console.error('Error editing project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { userid, projectId } = req.body;

        if (!userid || !projectId) {
            return res.json({
                success: false,
                message: 'Missing required fields: userid or projectId',
            });
        }

        // Find the user by ID
        const user = await userModel.findById(userid);
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const projectIndex = user.projects.findIndex(
            (project) => project._id.toString() === projectId
        );

        if (projectIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }


        user.projects.splice(projectIndex, 1);


        await user.save();

        return res.json({
            success: true,
            message: 'Project deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const deleteskill = async (req, res) => {
    try {
        const { userid, skillsid } = req.body;

        if (!userid || !skillsid) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userid or skillsid',
            });
        }

        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const skillIndex = user.skills.findIndex(
            (skill) => skill._id.toString() === skillsid
        );

        if (skillIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found',
            });
        }

        user.skills.splice(skillIndex, 1);

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Skill deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting skill:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const addskills = async (req, res) => {
    try {
        const { userid, skillName, skillUse } = req.body;
        if (!userid || !skillName) {
            return res.status(400).json({ message: "User ID and skill name are required" });
        }

        const user = await userModel.findById(userid);

        if (!user) {
            return res.json({ message: "User not found" });
        }

        user.skills.push({ name: skillName, use: skillUse || '' });

        await user.save();

        return res.status(200).json({ message: "Skill added successfully", user });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const showskills = async (req, res) => {
    try {

        const { userid } = req.body
        const userdata = await userModel.findById(userid).select('skills')

        res.json({ success: true, skills: userdata.skills });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const showAllProjects = async (req, res) => {
    try {
        const { userid } = req.body; // Extract user ID from the request body

        // Fetch the user by ID and select only the 'projects' field
        const user = await userModel.findById(userid).select('projects');

        // If user or projects are not found
        if (!user || !user.projects || user.projects.length === 0) {
            return res.status(404).json({ success: false, message: 'No projects found for this user' });
        }

        // Return the user's projects
        return res.status(200).json({ success: true, projects: user.projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// without auth data

const allusersprojects = async (req, res) => {
    try {
        const projects = await userModel.find({}).select(['projects'])
        res.json({ success: true, projects })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Server error' });
    }
}

const alldevelopers = async (req,res) => {
    try {
        const developers = await userModel.find({}).select(['name','profile_photo','role'])
        res.json({ success: true, developers })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Server error' });
    }
}

const selecteddev = async (req, res) => {
    try {
      const { _id } = req.query; 
  
      if (!_id) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
  
      const userdata = await userModel.findById(_id).select("-password");
      if (!userdata) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      return res.json({ success: true, userdata });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ success: false, message: "Server error." });
    }
  };


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // DevInsta email
      pass: process.env.EMAIL_PASS, // App Password
    },
  });
  

 const contact = async (req, res) => {
    const { name, email, message, developerEmail } = req.body;
  
    try {
      await transporter.sendMail({
        from: `"DevInsta" <${process.env.EMAIL_USER}>`,
        to: developerEmail,
        subject: `New Message from ${name} via DevInsta`,
        text: `Hello,\n\nYou have a new message.\n\n👤 Name: ${name}\n📧 Email: ${email}\n✉️ Message: "${message}"\n\nReply to ${email} directly.`,
      });
  
      res.json({ success: true, message: "Message sent!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  };
export { registerUser, loginUser, editprofile, getprofile, addproject, editProject, deleteProject, addskills, showskills, showAllProjects, allusersprojects, alldevelopers, selecteddev, deleteskill, contact };
