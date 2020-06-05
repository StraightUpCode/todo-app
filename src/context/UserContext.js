import { createContext } from "react";

const UserContext = createContext ({
    user : null, 
    logInUser : (user) => {},
    logOutUser : (user)=>{}
})


export default UserContext