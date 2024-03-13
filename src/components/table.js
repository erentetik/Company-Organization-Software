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
    regionList, cityList , handleClick ,region, city , companyType, companyTypeList, addressTown, addressTownList, isCompany}) {
    const token = localStorage.getItem("token");
    const [rows, setRows] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);


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
    }, [apiUrl, token, mapper]);

    
    const handleRowSelection = (selection) => {
        setSelectedRowIds(selection);
    };

    useEffect(() => {
        if (selectedRowIds.length == 1) {
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
            <Button
                type="Add User"
                width="100%"
                onClick={handleDelete}
            >Delete</Button>
            
             <Button
                type="submit"
                width="100%"
                onClick={handleEditClick} // Show button when rows are selected
            >
                Edit
            </Button>
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