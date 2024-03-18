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
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { InputLabel } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import translations from "../../Resources/languages";

const Companies = ({ language }) => {
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        };
    const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: translations[language]['name'], width: 150 },
    { field: 'shortName', headerName: translations[language]['shortName'], width: 150 },
    { field: 'companyType', headerName: translations[language]['companyType'], width: 150, valueGetter: (params) => params.row.companyType.name },
    { field: 'addressStreet', headerName: translations[language]['addressStreet'], width: 150 },
    { field: 'addressTown', headerName: translations[language]['addressTown'], width: 150, valueGetter: (params) => params.row.addressTown.name },
    { field: 'region', headerName: translations[language]['region'], width: 150, valueGetter: (params) => params.row.addressTown.region.name },
    { field: 'city', headerName: translations[language]['city'], width: 150, valueGetter: (params) => params.row.addressTown.city.name }
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
       // region: item.addressTown.region,
        //city: item.addressTown.city
    }));
};
const userRole = localStorage.getItem("role");

const [showForm, setShowForm] = useState(false);
const [name , setName] = useState('');
const [shortName, setShortName] = useState('');
const [companyType, setCompanyType] = useState('');
const [addressStreet, setAddressStreet] = useState('');
const [addressTown, setAddressTown] = useState('');
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const token = localStorage.getItem("token");
const [companyTypeList, setCompanyTypeList] = useState([]);
const [addressTownList, setAddressTownList] = useState([]);
const [editData, setEditData] = useState({});
const [isCompany, setIsCompany] = useState(false);

const handleShowForm = () => {
    if (showForm) {
        setShowForm(false);
        return;
    }
    setShowForm(true);
};

const handleClick = async() => {
    setIsCompany(true);
    await axios.get(url + '/api/v1/companyType', {
        headers: {
            Authorization: token
        }
    }).then(response => {
        setCompanyTypeList(response.data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    await axios.get(url + '/api/v1/town', {
        headers: {
            Authorization: token
        }
    }).then(response => {
        setAddressTownList(response.data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

};

const handleDelete = async () => {
    const ids = localStorage.getItem("selectedRowIds");
    const parsedIds = parseInt(ids);
    await axios.delete(url + '/api/v1/company/' + ids , {
        id: parsedIds,
        headers: {
            Authorization: token
        }
    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Company deleted');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Company can not deleted');
        setSnackbarOpen(true);
    });
}
const handleSubmit = async(data) => {
    data.preventDefault();

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
        setSnackbarMessage('Company added');
        setSnackbarOpen(true);
        setShowForm(false);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Company can not added');
        setSnackbarOpen(true);
        setShowForm(false);
        

    });
};
const handleChange = async() => {
    const ids = localStorage.getItem("selectedRowIds");
    await axios.put(url + '/api/v1/company/' + ids , {
        name: editData.name,
        shortName: editData.shortName,
        companyType: editData.companyType,
        addressStreet: editData.addressStreet,
        addressTown: editData.addressTown,
        id: ids,

       }, {
        headers: {
            Authorization: token
        }

    }).then(response => {
        console.log("Fetch operation was successful", response);
        setSnackbarMessage('Company updated');
        setSnackbarOpen(true);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Company can not updated');
        setSnackbarOpen(true);
    });
}

    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} handleDelete={handleDelete} handleChange={handleChange}
            editData={editData} setEditData={setEditData} handleClick={handleClick} companyType={companyType} companyTypeList={companyTypeList}
            addressTown={addressTown} addressTownList={addressTownList} isCompany={isCompany} handleShowForm={handleShowForm} language={language}/>

          
            {/* <Button
                  type="Add Company"
                  width="100%"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    handleShowForm();
                    handleClick();
                }}
                >
                  Add Company
                </Button> */}

                <Dialog open={showForm} onClose={handleShowForm}>
                <DialogTitle>Add Company</DialogTitle>
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
                    <InputLabel id="companyType">Company Type</InputLabel>
                 <Select
                    labelId="companyType"
                    id="companyType"
                    required
                    fullWidth
                    value={companyType} 
                    label="companyType"
                    onChange={(data) => setCompanyType(data.target.value)}
                >
                {companyTypeList.map((companyTypeItem) => (
                    <MenuItem key={companyTypeItem.id} value={companyTypeItem.name}>
                    {companyTypeItem.name}
                    </MenuItem>
                ))}
                </Select>
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
                     <InputLabel id="addressTown">Address Town</InputLabel>
                 <Select
                    labelId="addressTown"
                    id="addressTown"
                    required
                    fullWidth
                    value={addressTown} 
                    label="addressTown"
                    onChange={(data) => setAddressTown(data.target.value)}
                >
                {addressTownList.map((addressTownItem) => (
                    <MenuItem key={addressTownItem.id} value={addressTownItem.name}>
                    {addressTownItem.name}
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
 
export default Companies;