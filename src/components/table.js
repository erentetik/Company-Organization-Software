import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { url } from '../components/constants';
import { Button, Select } from "@mui/material";
import { GridToolbar } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


function DataTable({ columns, apiUrl, mapper , handleDelete, handleChange, editData, setEditData , 
    regionList, cityList , handleClick  , companyTypeList, addressTownList, isCompany , companyList, roleList, departmentList , handleShowForm}) {
    const token = localStorage.getItem("token");
    const [rows, setRows] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + apiUrl, {
                    headers: {
                        Authorization: token
                    }
                });
                const responseData = response.data;
                const updatedRows = mapper(responseData);
                setRows(updatedRows);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, [apiUrl , mapper, token]);

    
    const handleRowSelection = (selection) => {
        setSelectedRowIds(selection);
    };

    useEffect(() => {
        if (selectedRowIds.length === 1) {
            localStorage.setItem("selectedRowIds", selectedRowIds);
            setShowButton(true);
        }else{
            localStorage.setItem("selectedRowIds", selectedRowIds);
            setShowButton(false);

        }
    }, [selectedRowIds]);

    const handleEditClick = () => {
        const selectedRowId = selectedRowIds[0];
        const selectedRow = rows.find(row => row.id === selectedRowId);
    
        setEditData(selectedRow);
        setOpenEditDialog(true);
        handleClick();        
    
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

    const handleDataChange = () => {
        setOpenEditDialog(false);
    };

    useEffect(() => {
        localStorage.setItem("editData", editData);
    }
    , [editData]);


    return (
        <div>
             <div style={{ position: 'relative', display: 'inline-block' , justifyContent: 'flex-end'}}>
             {showButton && 
             <>
                {userRole === 'ROLE_ADMIN' && (
                    
                <Button
                     style={{
                        margin: '8px',
                        width: '64px',
                        height: '32px',
                        minWidth: '32px',
                        minHeight: '32px',
                        fontSize: '12px',
                        color: 'white',
                        backgroundColor: 'red'
    
                    }}
                    variant='contained'
                    size='large'
                    onClick={() => {
                        handleDelete();
                    }}
                >
                    Delete
                </Button>
                )}
           
                <Button
                style={{
                   margin: '8px',
                   width: '64px',
                   height: '32px',
                   minWidth: '32px',
                   minHeight: '32px',
                   fontSize: '12px',
                   color: 'white',

               }}
               variant='contained'
               size='large'
               onClick={() => {
                   handleEditClick();
               }}
           >
               Edit
           </Button>
           </>
            }
                <Button
                     style={{
                        margin: '8px',
                        width: '32px',
                        height: '32px',
                        minWidth: '32px',
                        minHeight: '32px',
                        fontSize: '12px',
                    }}
                    variant='contained'
                    size='large'
                    onClick={() => {
                        handleShowForm();
                        handleClick();
                    }}
                >
                    Add 
                </Button>
            </div>
        
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    components={{ Toolbar: GridToolbar }} // Show toolbar for edit and delete
                />
            </div>
            {showButton && 
            <div>
            {/* {userRole === 'ROLE_ADMIN' && (
                <>
                    <Button type="Delete" width="100%" onClick={handleDelete}>Delete</Button>
                  
                </>
            )} */}
              {/* <Button type="Edit" width="100%" onClick={handleEditClick}>Edit</Button> */}
            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogTitle>Edit Data</DialogTitle>
                <DialogContent>
                    {editData && Object.keys(editData).slice(1).map(key => (
                        <div key={key}>
                            {key === 'region' && !isCompany? (       
                                <div>
                                    <InputLabel id="region">Region</InputLabel>
                                    <Select
                                        labelId="region"
                                        id="region"
                                        required
                                        fullWidth
                                        value={editData.region || ''}
                                        label="region"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {regionList?.map(regionItem => (
                                            <MenuItem key={regionItem.id} value={regionItem.name}>{regionItem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            ) : key === 'city' && !isCompany? (
                                <div>
                                    <InputLabel id="city">City</InputLabel>
                                    <Select
                                        labelId="city"
                                        id="city"
                                        required
                                        fullWidth
                                        value={editData.city || ''}
                                        label="city"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {cityList?.map(cityItem => (
                                            <MenuItem key={cityItem.id} value={cityItem.name}>{cityItem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            ) : key === 'companyType' ? (
                
                                <div>
                                    <InputLabel id="companyType">Company Type</InputLabel>
                                    <Select
                                        labelId="companyType"
                                        id="companyType"
                                        required
                                        fullWidth
                                        value={editData.companyType || ''}
                                        label="companyType"
                                            onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {companyTypeList?.map(companyTypeItem => (
                                            <MenuItem key={companyTypeItem.id} value={companyTypeItem.name}>{companyTypeItem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            ) : key === 'addressTown' ? (
                                <div>
                                    <InputLabel id="addressTown">Address Town</InputLabel>
                                    <Select
                                        labelId="addressTown"
                                        id="addressTown"
                                        required
                                        fullWidth
                                        value={editData.addressTown || ''}
                                        label="addressTown"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {addressTownList?.map((addressTownItem) => (
                                        <MenuItem key={addressTownItem.id} value={addressTownItem.name}>
                                        {addressTownItem.name}
                                        </MenuItem> 
                                    ))}
                                    </Select>
                                </div>
                            ):  key === 'company' ? (
                                <div>
                                    <InputLabel id="company">Company</InputLabel>
                                    <Select
                                        labelId="company"
                                        id="company"
                                        required
                                        fullWidth
                                        value={editData.company || ''}
                                        label="company"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {companyList?.map((companyItem) => (
                                        <MenuItem key={companyItem.id} value={companyItem.name}>
                                        {companyItem.name}
                                        </MenuItem> 
                                    ))}
                                    </Select>
                                </div> 
                            ):key === 'role' ? (
                                <div>
                                    <InputLabel id="role">Role</InputLabel>
                                    <Select
                                        labelId="role"
                                        id="role"
                                        required
                                        fullWidth
                                        value={editData.role || ''}
                                        label="role"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {roleList?.map((roleItem) => (
                                        <MenuItem key={roleItem.id} value={roleItem.name}>
                                        {roleItem.name}
                                        </MenuItem> 
                                    ))}
                                    </Select>
                                </div> 
                            ):key === 'department' ? (
                                <div>
                                    <InputLabel id="department">Department</InputLabel>
                                    <Select
                                        labelId="department"
                                        id="department"
                                        required
                                        fullWidth
                                        value={editData.department || ''}
                                        label="department"
                                        onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                    >
                                        {departmentList?.map((departmentItem) => (
                                        <MenuItem key={departmentItem.id} value={departmentItem.name}>
                                        {departmentItem.name}
                                        </MenuItem> 
                                    ))}
                                    </Select>
                                </div> 
                            ):(
                                <TextField
                                    margin="dense"
                                    id={key}
                                    label={key}
                                    type="text"
                                    fullWidth
                                    value={editData[key]}
                                    onChange={(e) => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                                />
                            )}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={() => {
                        handleChange();
                        handleDataChange();
                    }}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </div>
        }
 
        </div>
    );
}

export default DataTable;