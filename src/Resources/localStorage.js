
const LocalStorageDelete= () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userToken")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    localStorage.removeItem("surname")
    localStorage.removeItem("email")
    localStorage.removeItem("department")
    localStorage.removeItem("company")
    localStorage.removeItem("image")
    localStorage.removeItem("token")
    localStorage.removeItem("signedIn")
}

export default LocalStorageDelete;