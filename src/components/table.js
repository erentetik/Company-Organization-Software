import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { url } from '../components/constants';
import { Button } from "@mui/material";
import { GridToolbar } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';


function DataTable({ columns, apiUrl, mapper , handleDelete, handleChange}) {
    const token = localStorage.getItem("token");
    const [rows, setRows] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editData, setEditData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + apiUrl, {
                    headers: {
                        Authorization: token
                    }
                });
                console.log("Fetch operation was successful", response);
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
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEdit = () => {
        // Handle save edit logic
        console.log("Edited data:", editData);
        setOpenEditDialog(false);
    };



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
                    {Object.keys(editData).slice(1,).map(key => (
                        <TextField
                            key={key}
                            margin="dense"
                            id={key}
                            label={key}
                            type="text"
                            fullWidth
                            value={editData[key]}
                            onChange={e => setEditData(prevData => ({ ...prevData, [key]: e.target.value }))}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleChange}>Save</Button>
                </DialogActions>
            </Dialog>
            </div>}
    
            
        </div>
    );
}

export default DataTable;
