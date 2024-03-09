import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const Users = () => {
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState('');
    const [name , setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [company, setCompany] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const token = localStorage.getItem("token");
    const columns1 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Name', width: 150 },
        { field: 'lastName', headerName: 'Surname', width: 150 },
        {field: 'email', headerName: 'Email', width: 250},
          {field: 'role', headerName: 'Role', width: 150},
          {field: 'department', headerName: 'Department', width: 150},
          {field: 'company', headerName: 'Company', width: 150}
      ];
    const apiUrl1 = '/api/v1/user/users';
    
    const mapUserData = (data) => {
        return data.map((item, index) => ({
            id: index +1,
            firstName: item.name,
            lastName: item.surname,
            email: item.email,
            role: item.role,
            department: item.department

        }));
    };
    const handleClick = () => {
        setShowForm(true);
    };
    const handleSubmit = async(data) => {
        data.preventDefault();

        const formData = new FormData(data.target);
        const email = formData.get("email");
        const name = formData.get("name");
        const surname = formData.get("surname");
        const role = formData.get("role");
        const department = formData.get("department");

        await axios.post(url + '/api/v1/user/users/addUser', {
            name: name,
            surname: surname,
            email: email,
            role: role,
            department: department,
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

    return ( 
        <div>
            <NavBar />
            <DataTable columns={columns1} apiUrl={apiUrl1} mapper={mapUserData} />
            <Button
                  type="Add USer"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Add User
                </Button>
            {showForm && (
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="role"
                    label="role"
                    type="role"
                    id="role"
                    onChange={(data) => setRole(data.target.value)}
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="department"
                    label="department"
                    type="department"
                    id="department"
                    onChange={(data) => setDepartment(data.target.value)}
                    />
                                    
                 <Button
                
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                    Add User
                 </Button>
                 
                

            </Box>
            )}
        </div>
     );
}
 
export default Users;