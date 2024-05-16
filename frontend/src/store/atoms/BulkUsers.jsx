import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../configs";

const bulkUser = atom({
    key:"bulkUsers",
    default:selector({
        key:"bulkUserSelector",
        get:async()=>{
            const res = await fetch(`${BACKEND_URL}/user/v1/bulk`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            return data.user
        }
    })
})

export default bulkUser
