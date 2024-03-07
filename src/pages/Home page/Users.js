import DataTable from "../../components/table";
import NavBar from "../../components/navbar";
const Users = () => {
    const columns1 = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Name', width: 150 },
        { field: 'lastName', headerName: 'Surname', width: 150 },
        {field: 'email', headerName: 'Email', width: 250},
          {field: 'role', headerName: 'Role', width: 150},
          {field: 'department', headerName: 'Department', width: 150},
          {field: 'company', headerName: 'Company', width: 150}
      ];
    const apiUrl1 = '/api/v1/user/users';
    const mapUserData = (data) => {
        return data.map((item, index) => ({
            id: index + 1,
            firstName: item.name,
            lastName: item.surname,
            email: item.email,
            role: item.role,
            department: item.department

        }));
    };

    return ( 
        <div>
            <NavBar />
            <DataTable columns={columns1} apiUrl={apiUrl1} mapper={mapUserData} />

        </div>
     );
}
 
export default Users;