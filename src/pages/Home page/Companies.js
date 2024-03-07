import DataTable from "../../components/table";
import NavBar from "../../components/navbar";

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
    return data.map((item, index) => ({
        id: index + 1,
        name: item.name,
        shortName: item.shortName,
        companyType: item.companyType,
        addressStreet: item.addressStreet,
        addressTown: item.addressTown,
        region: item.addressTown.region,
        city: item.addressTown.city
    
    }));
};
    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} />
        </div>

     );
}
 
export default Companies;