import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Translations from "../../Resources/languages";

const Town = ({ language }) => {
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: Translations[language]['name'], width: 150 },
        { field: 'region', headerName:  Translations[language]['region'], width: 150, valueGetter: (params) => params.row.region.name },
        { field: 'city', headerName:  Translations[language]['city'], width: 150, valueGetter: (params) => params.row.city.name }
      ];
  const apiUrl = '/api/v1/town';

  const mapUserData = (data) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        region: item.region,
        city: item.city
    }));
};
const userRole = localStorage.getItem("role");

const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [region, setRegion] = useState('');
const [city, setCity] = useState('');
const [regionList, setRegionList] = useState([]);
const [cityList, setCityList] = useState([]);
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

const handleClick = async() => {
    await axios.get(url + '/api/v1/region', {

        headers: {
            Authorization: token
        }
    }).then(response => {
        setRegionList(response.data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    await axios.get(url + '/api/v1/city', {
        headers: {
            Authorization: token
        }
    }).then(response => {
        setCityList(response.data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

const handleDelete = async () => {
    const ids = localStorage.getItem("selectedRowIds");
    const parsedIds = parseInt(ids);
    await axios.delete(url + '/api/v1/town/' + ids , {
        id: parsedIds,
        headers: {
            Authorization: token
        }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Town deleted');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Town can not deleted');
        setSnackbarOpen(true);
    });
}
const handleSubmit = async(data) => {
    data.preventDefault();

    await axios.post(url + '/api/v1/town', {
        name: name,
        region: region,
        city: city,
       
        }, {
            headers: {
                Authorization: token,
               
            }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Town added');
        setSnackbarOpen(true);
        setShowForm(false);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Town can not added');
        setSnackbarOpen(true);
        setShowForm(false);


    });
        
 
};
const handleChange = async () => {
    const ids = localStorage.getItem("selectedRowIds");
    let regionData = editData.region;
    let regionCity = editData.city;

    if (editData.region.name !== undefined) {    
       regionData = editData.region.name;
    }
    if (editData.city.name !== undefined) {
        regionCity = editData.city.name;
    }


    await axios.put(url + '/api/v1/town/' + ids, {
        name: editData.name,
        region: regionData,
        city: regionCity,
        id: ids,
    }, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Town updated');
        setSnackbarOpen(true);
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Town could not be updated');
        setSnackbarOpen(true);
    });
};

    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} handleDelete={handleDelete} handleChange={handleChange}
            editData={editData} setEditData={setEditData} regionList={regionList} cityList={cityList} handleClick={handleClick} language={language} handleShowForm={handleShowForm} region={region} city={city}/>
            {/* <Button
                  type="Add User"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    handleShowForm();
                    handleClick();
                }}
                >
                  Add Town
                </Button> */}

                <Dialog open={showForm} onClose={handleShowForm}>
                <DialogTitle>Add Town</DialogTitle>
                <DialogContent>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="name"
                   label="name"
                   name="name"
                   autoComplete="name"
                   autoFocus
                   onChange={(data) => setName(data.target.value)}    
                 />
                 <InputLabel id="region">Region</InputLabel>
                 <Select
                    labelId="region"
                    id="region"
                    required
                    fullWidth
                    value={region} 
                    label="region"
                    onChange={(data) => setRegion(data.target.value)}
                >
                {regionList.map((regionItem) => (
                    <MenuItem key={regionItem.id} value={regionItem.name}>
                    {regionItem.name}
                    </MenuItem>
                ))}
                </Select>
                <InputLabel id="Cities">Cities</InputLabel>
                 <Select
                    labelId="Cities"
                    id="Cities"
                    required
                    fullWidth
                    value={city} 
                    label="cities"
                    onChange={(data) => setCity(data.target.value)}
                >
               
                {cityList.map((citiesItem) => (
                    <MenuItem key={citiesItem.id} value={citiesItem.name}>
                    {citiesItem.name}
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
export default Town;