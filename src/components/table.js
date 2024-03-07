import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { url } from '../components/constants';


function DataTable({ columns, apiUrl, mapper }) {
    const token = localStorage.getItem("token");
    const [rows, setRows] = useState([]);

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

    return (
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
            />
        </div>
    );
}

export default DataTable;
