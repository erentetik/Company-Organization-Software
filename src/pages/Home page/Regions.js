import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Translations from "../../Resources/translations";

const Regions = ({ language }) => {
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      }
      
    const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName:Translations[language]['name'], width: 150 , editable: true},
  ];
  const apiUrl = '/api/v1/region';

  const mapUserData = (data) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
    }));
};
const handleClick = () => {
};
const userRole = localStorage.getItem("role");

const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const token = localStorage.getItem("token");
const [editData, setEditData] = useState({});
const handleShowForm = () => {
    if (showForm) {
        setShowForm(false);
        return;
    }
    setShowForm(true);
};

const handleDelete = async () => {
    const ids = localStorage.getItem("selectedRowIds");
    const parsedIds = parseInt(ids);
    await axios.delete(url + '/api/v1/region/' + ids , {
        id: parsedIds,
        headers: {
            Authorization: token
        }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('region deleted');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('region can not deleted');
        setSnackbarOpen(true);
    });
}
const handleSubmit = async(data) => {
    data.preventDefault();

    await axios.post(url + '/api/v1/region', {
        name: name,
        }, {
            headers: {
                Authorization: token
            }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('region added');
        setSnackbarOpen(true);
        setShowForm(false);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('region can not added');
        setSnackbarOpen(true);
        setShowForm(false);
    });
};
const handleChange = async() => {
    const ids = localStorage.getItem("selectedRowIds");
    await axios.put(url + '/api/v1/region/' + ids , {
        name: editData.name,
        id: ids,

       }, {
        headers: {
            Authorization: token
        }

    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Region deleted');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Region can not deleted');
        setSnackbarOpen(true);
    });
}
    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} handleDelete={handleDelete} handleChange={handleChange}
            editData={editData} setEditData={setEditData} handleClick={handleClick} handleShowForm={handleShowForm} language={language}/>
            {/* <Button
                  type="Add User"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleShowForm}
                >
                  Add Region
                </Button> */}

                <Dialog open={showForm} onClose={handleShowForm}>
                <DialogTitle>Add Region</DialogTitle>
                <DialogContent>
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
                </Box> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShowForm}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
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
 
export default Regions;