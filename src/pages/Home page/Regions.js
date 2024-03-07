import DataTable from "../../components/table";
import NavBar from "../../components/navbar";

const Regions = () => {
    const columns = [{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
  ];
  const apiUrl = '/api/v1/region';

  const mapUserData = (data) => {
    return data.map((item, index) => ({
        id: index + 1,
        name: item.name,
        
    
    }));
};
    return ( 
        <div>
            <NavBar/>
            <DataTable columns={columns} apiUrl={apiUrl} mapper={mapUserData} />
        </div>

     );
}
 
export default Regions;