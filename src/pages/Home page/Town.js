import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";

const Town = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'region', headerName: 'Region', width: 150, valueGetter: (params) => params.row.region.name },
        { field: 'city', headerName: 'City', width: 150, valueGetter: (params) => params.row.city.name }
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
const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [region, setRegion] = useState('');
const [city, setCity] = useState('');
const [regionList, setRegionList] = useState([]);
const [cityList, setCityList] = useState([]);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const token = localStorage.getItem("token");

const handleClick = async() => {
    if (showForm) {
        setShowForm(false);
        return;
    }
    setShowForm(true);

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
                  type="Add USer"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Add Town
                </Button>
                {showForm && (
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
                                    
                 <Button
                
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                    Add Town
                 </Button>
                 
                

            </Box>
           )}
        </div>
     );    
}
export default Town;