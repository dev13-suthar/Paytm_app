/* eslint-disable no-unused-vars */
import { useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil"
import userAtom from "../../store/atoms/Atoms"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../configs";
import User from "../../comps/User";
import bulkUser from "../../store/atoms/BulkUsers";


const HomePage = () => {
    const user = useRecoilValue(userAtom);
    const [bulkuserss,setBulkuserss] = useRecoilStateLoadable(bulkUser)
    
    const allUsers = bulkuserss.contents;
    // if(bulkuserss.state==="hasValue"){
    //     allUsers.map((item)=>{
    //         console.log(item.userName)
    //     })
    // }
    const [balance, setbalance] = useState(0);
    useEffect(()=>{
        const getBalance = async()=>{
            const res = await fetch(`${BACKEND_URL}/account/v1/balance`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setbalance(data.amount)
        }

        getBalance();
    },[])

    if(bulkuserss.state === "loading"){
        return "lloadinfffff"
    }
  return (
    <div className="p-2">
        <p className="p-4 text-2xl font-bold text-white">
             Balance:{balance.toFixed(2)}
        </p>
        <p className="pl-6 pt-2 text-[14px]">
            Users
        </p>
        <div className="flex items-center justify-center mt-2 pl-5">
            <input type="text" className="p-2 rounded-md shadow-lg w-[100%] text-stone-800 shadow-inner" placeholder="Search Users"/>
        </div>
    <div className="pt-[1.4rem] px-3 flex flex-col items-center">
        <div className="flex flex-col w-[98%]  mt-[1.887rem] gap-2 p-2 justify-center">
            {
                allUsers.map((user)=>(
                    <User key={user._id} userName={user.userName} id={user._id} firstName={user.firstName}/>
                ))
            }
        </div>  
    </div>
    </div>
  )
}

export default HomePage
