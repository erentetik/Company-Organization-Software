import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../components/constants';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

const Companies = () => {
    const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'shortName', headerName: 'Short Name', width: 150 },
    { field: 'companyType', headerName: 'Company Type', width: 150, valueGetter: (params) => params.row.companyType.name },
    { field: 'addressStreet', headerName: 'Street', width: 150 },
    { field: 'addressTown', headerName: 'Town', width: 150, valueGetter: (params) => params.row.addressTown.name },
    { field: 'region', headerName: 'Region', width: 150, valueGetter: (params) => params.row.addressTown.region.name },
    { field: 'city', headerName: 'City', width: 150, valueGetter: (params) => params.row.addressTown.city.name }
  ];
  const apiUrl = '/api/v1/company';

  const mapUserData = (data) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        shortName: item.shortName,
        companyType: item.companyType,
        addressStreet: item.addressStreet,
        addressTown: item.addressTown,
        region: item.addressTown.region,
        city: item.addressTown.city
    }));
};
const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [shortName, setShortName] = useState('');
const [companyType, setCompanyType] = useState('');
const [addressStreet, setAddressStreet] = useState('');
const [addressTown, setAddressTown] = useState('');
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

    const formData = new FormData(data.target);
    const name = formData.get("name");
    const shortName = formData.get("shortName");
    const companyType = formData.get("companyType");
    const addressStreet = formData.get("addressStreet");
    const addressTown = formData.get("addressTown");



    await axios.post(url + '/api/v1/company', {
        name: name,
        shortName: shortName,
        companyType: companyType,
        addressStreet: addressStreet,
        addressTown: addressTown
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
                  type="Add Company"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Add Company
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
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="shortName"
                    label="shortName"
                    type="shortName"
                    id="shortName"
                    onChange={(data) => setShortName(data.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="companyType"
                    label="companyType"
                    type="companyType"
                    id="companyType"
                    onChange={(data) => setCompanyType(data.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="addressStreet"
                    label="addressStreet"
                    type="addressStreet"
                    id="addressStreet"
                    onChange={(data) => setAddressStreet(data.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="addressTown"
                    label="addressTown"
                    type="addressTown"
                    id="addressTown"
                    onChange={(data) => setAddressTown(data.target.value)}
                    />
                 <Button
                   type="submit"
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
                 >
                    Add Company
                 </Button>
            </Box>
            )}
        </div>
     );    
}
 
export default Companies;