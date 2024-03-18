import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import LocalStorageDelete from "../../Resources/localStorage";
import { TextField, Box, Button, Select, MenuItem, InputLabel,  Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import translations from "../../Resources/languages";

const Users = ({signedIn, setSignedIn, language }) => {
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        if (!signedIn) {
            LocalStorageDelete()
            setSignedIn(false)
        }
    }
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [userNameList, setUserNameList] = useState([]);
    const [email, setEmail] = useState('');
    const [name , setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [showPhotoForm, setShowPhotoForm] = useState(false);
    const [company, setCompany] = useState('');
    const [roleList, setRoleList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [editData, setEditData] = useState({});
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const [isUser, setIsUser] = useState(true);


    const columns1 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: translations[language]['name'], width: 150 },
        { field: 'lastName', headerName: translations[language]['surname'], width: 150 },
        {field: 'email', headerName: translations[language]['email'], width: 250},
          {field: 'role', headerName: translations[language]['role'], width: 150},
          {field: 'department', headerName: translations[language]['department'], width: 150},
          {field: 'company', headerName: translations[language]['company'], width: 150}
      ];
    const apiUrl1 = '/api/v1/user/users';
    
    const mapUserData = (data) => {
        return data.map((item) => ({
            id: item.id,
            firstName: item.name,
            lastName: item.surname,
            email: item.email,
            role: item.role,
            department: item.department,
            company: item.company

        }));
    };
    const handlephotoClick = async() => {
        if (showPhotoForm) {
            setShowPhotoForm(false);
            return;
        }
        setShowPhotoForm(true);

        await axios.get(url + '/api/v1/user/users', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setUserNameList(response.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleShowForm = () => {
        if (showForm) {
            setShowForm(false);
            return;
        }
        setShowForm(true);
    };

    const handleClick = async() => {
        
        await axios.get(url + '/api/v1/role', {

            headers: {
                Authorization: token
            }
        }).then(response => {
            setRoleList(response.data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    
        await axios.get(url + '/api/v1/department', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setDepartmentList(response.data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        await axios.get(url + '/api/v1/company', {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setCompanyList(response.data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    const handleSubmit = async(data) => {
        data.preventDefault();

        await axios.post(url + '/api/v1/user/users/addUser', {
            name: name,
            surname: surname,
            email: email,
            role: role,
            department: department,
            company: company,
            password: ''
            }, {
                headers: {
                    Authorization: token,         
                }

        }).then(response => {
            console.log("Fetch operation was successful", response);
            setSnackbarMessage('User added');
            setSnackbarOpen(true);
            setShowForm(false);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setSnackbarMessage('User can not added');
            setSnackbarOpen(true);
            setShowForm(false);
    

        });
            
     
    };

    const handleDelete = async () => {
        const ids = localStorage.getItem("selectedRowIds");
        const parsedIds = parseInt(ids);
        await axios.delete(url + '/api/v1/user/users/' + ids , {
            id: parsedIds,
            headers: {
                Authorization: token
            }
        }).then(response => {
            console.log("Fetch operation was successful", response);
            setSnackbarMessage('User deleted');
            setSnackbarOpen(true);
        
         
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setSnackbarMessage('User can not deleted');
            setSnackbarOpen(true);
        });
    }
    const uploadPhoto = async () => {
        const ids = userId;
        let formData = new FormData();
        formData.append('photo', file);
    
        if (!file) {
            console.error('No file selected');
            return;
        }
    
        try {
            const response = await axios.post(url + '/api/v1/user/' + ids + '/upload-profile-photo', {
                id: ids,
                photo: file
            }, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Image uploaded successfully:', response.data);
            setSnackbarMessage('Image uploaded successfully');
            setSnackbarOpen(true);
            setSelectedFileName(file.name); // Set the selected file name
        } catch (error) {
            console.error('Error uploading image:', error);
            setSnackbarMessage('Error uploading image');
            setSnackbarOpen(true);
        }
    };
   
    const handleChange = async() => {
        const ids = localStorage.getItem("selectedRowIds");
        await axios.put(url + '/api/v1/user/users/' + ids , {
            name: editData.firstName,
            surname: editData.lastName,
            email: editData.email,
            role: editData.role,
            department: editData.department,
            company: editData.company,
            id: ids,
            }, {
            headers: {
                Authorization: token
            }
    
        }).then(response => {
            console.log("Fetch operation was successful", response);
            setSnackbarMessage('User updated');
            setSnackbarOpen(true);

           
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setSnackbarMessage('User can not updated');
            setSnackbarOpen(true);

            
        });
    };
    

    return ( 
        <div>
            <NavBar />
            <DataTable columns={columns1} apiUrl={apiUrl1} mapper={mapUserData} setEditData={setEditData} handleClick={handleClick} companyList={companyList}
            editData={editData} departmentList={departmentList} roleList={roleList} handleDelete={handleDelete} handleChange={handleChange} handleShowForm={handleShowForm} handlephotoClick={handlephotoClick}
            isUser={isUser} language={language}/>
            
                {/* <>
                        <Button
                    type="Add User"
                    width="100%"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }} // Add margin-right to create space
                    onClick={() => {
                        handleShowForm();
                        handleClick();
                    }
                }
                >
                    Add User
                </Button> */}
                 
                {/* {userRole === 'ROLE_ADMIN' && (
                <Button
                    type="Add User"
                    width="100%"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 2 }} // Add margin-left to create space
                    onClick={handlephotoClick}
                >
                    Add Photo
                </Button>
                )} */}
               
                <Dialog open={showForm} onClose={handleClick} fullWidth>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="email"
                   label="Email Address"
                   name="email"
                   autoComplete="email"
                   autoFocus
                   onChange={(data) => setEmail(data.target.value)}    
                 />
                 
                  <TextField
                   margin="normal"
                   required
                   fullWidth
                   name="name"
                   label="name"
                   type="name"
                   id="name"
                   onChange={(data) => setName(data.target.value)}
                 />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="surname"
                    label="surname"
                    type="surname"
                    id="surname"
                    onChange={(data) => setSurname(data.target.value)}
                    />
                <InputLabel id="Role">Role</InputLabel>
                 <Select
                    labelId="Role"
                    id="Role"
                    required
                    fullWidth
                    value={role} 
                    label="Role"
                    onChange={(data) => setRole(data.target.value)}
                >
               
                {roleList.map((roleItem) => (
                    <MenuItem key={roleItem.id} value={roleItem.name}>
                    {roleItem.name}
                    </MenuItem>
                ))}
                </Select>
                <InputLabel id="company">Company</InputLabel>
                 <Select
                    labelId="company"
                    id="company"
                    required
                    fullWidth
                    value={company} 
                    label="company"
                    onChange={(data) => setCompany(data.target.value)}
                >
               
                {companyList.map((companyItem) => (
                    <MenuItem key={companyItem.id} value={companyItem.name}>
                    {companyItem.name}
                    </MenuItem>
                ))}
                </Select>
                <InputLabel id="Department">Department</InputLabel>
                 <Select
                    labelId="Department"
                    id="Department"
                    required
                    fullWidth
                    value={department} 
                    label="Department"
                    onChange={(data) => setDepartment(data.target.value)}
                >
               
                {departmentList.map((departmentItem) => (
                    <MenuItem key={departmentItem.id} value={departmentItem.name}>
                    {departmentItem.name}
                    </MenuItem>
                ))}
                </Select>    
                </Box> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShowForm}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>

            
            <Dialog open={showPhotoForm} onClose={handlephotoClick}
            fullWidth>
                <DialogTitle>Add Photo</DialogTitle>
                <DialogContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
               
                <InputLabel id="User">User</InputLabel>
                <Select
                labelId="User"
                id="User"
                required
                fullWidth
                value={userId} 
                label="user"
                onChange={(event) => {
                    const userId = event.target.value;
                    setUserId(userId);
                    const selectedUser = userNameList.find(userItem => userItem.id === userId);
                    if (selectedUser) {
                        setName(selectedUser.name);
                    }
                }}
            >
                {userNameList.map((userItem) => (
                    <MenuItem key={userItem.id} value={userItem.id}>
                        {userItem.name + ' ' + userItem.surname}
                    </MenuItem>
                ))}
            </Select>
                <InputLabel htmlFor="photoUpload">Upload Photo</InputLabel>
                    <input
                        style={{ display: 'none' }}
                        accept="image/*"
                        id="photoUpload"
                        multiple
                        type="file"
                        onChange={(data) => {
                            setFile(data.target.files[0]);
                            setSelectedFileName(data.target.files[0]?.name); // Set the selected file name
                        }}
                    />
                    <label htmlFor="photoUpload">
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                      </label>
                      {selectedFileName && (
                        <p>Selected File: {selectedFileName}</p> // Display the selected file name
                    )}
                </Box> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlephotoClick}>Cancel</Button>
                    <Button onClick={() => {
                        uploadPhoto();
                        handlephotoClick();
                    }}
                    >Add</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <SnackbarContent message={snackbarMessage} />
          </Snackbar>

            
        </div>
     );
}
 
export default Users;