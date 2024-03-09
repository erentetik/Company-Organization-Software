import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const City = () => {
    const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
  ];
  const apiUrl = '/api/v1/city';

  const mapUserData = (data) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
    }));
};


const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const token = localStorage.getItem("token");

const handleClick = () => {
    if (showForm) {
        setShowForm(false);
        return;
    }
    setShowForm(true);
};
const handleDelete = async () => {
    const ids = localStorage.getItem("selectedRowIds");
    const parsedIds = parseInt(ids);
    await axios.delete(url + '/api/v1/city/' + ids , {
        id: parsedIds,
        headers: {
            Authorization: token
        }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('city deleted');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('city can not deleted');
        setSnackbarOpen(true);
    });
}
const handleSubmit = async(data) => {
    data.preventDefault();

    const formData = new FormData(data.target);
    const name = formData.get("name");


    await axios.post(url + '/api/v1/city', {
        name: name,
        }, {
            headers: {
                Authorization: token
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
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} handleDelete={handleDelete} />
            <Button
                  type="Add User"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Add City
                </Button>
            {showForm && (
                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                 <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                    Add City
                 </Button>
            </Box>
            )}
        </div>
     );    
}
 
export default City;