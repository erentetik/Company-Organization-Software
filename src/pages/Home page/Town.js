import DataTable from "../../components/table";
import NavBar from "../../components/navbar";

const Town = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'region', headerName: 'Region', width: 150, valueGetter: (params) => params.row.region.name },
        { field: 'city', headerName: 'City', width: 150, valueGetter: (params) => params.row.city.name }
      ];
  const apiUrl = '/api/v1/town';

  const mapUserData = (data) => {
    return data.map((item, index) => ({
        id: index + 1,
        name: item.name,
        region: item.region,
        city: item.city
    }));
};
    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} />
        </div>

     );
}
 
export default Town;