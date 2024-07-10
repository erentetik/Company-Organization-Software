
const LocalStorageDelete= () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userToken")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    localStorage.removeItem("surname")
    localStorage.removeItem("email")
    localStorage.removeItem("department")
    localStorage.removeItem("company")
}

export default LocalStorageDelete