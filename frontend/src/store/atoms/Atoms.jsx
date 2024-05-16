import {atom} from "recoil"


const userAtom = atom({
    key:"user",
    default:[{
        _id:"",
        firstName:"",
        lastName:"",
        userName:"",
    }]
})
export default userAtom


