import { Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../configs"
import { useSetRecoilState } from "recoil"
import userAtom from "../../store/atoms/Atoms"

const initialValues = {
  userName:"",
  password:""
}

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
    const sendData = async(values)=>{
      try {
          const res = await fetch(`${BACKEND_URL}/user/v1/signIn`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
          });
          const data = await res.json();
          setUser({
            _id:data.foundUser._id,
            userName:data.foundUser.userName,
            firstName:data.foundUser.firstName,
            lastName:data.foundUser.lastName
          })
          localStorage.setItem("token",data.token)
          navigate("/home")
      } catch (error) {
        console.log(error)
      }
    }

  const handleFormSubmit = async(values)=>{
    await sendData(values);
  }
  return (
    <div className="flex items-center justify-center p-3 h-[90vh] w-full text-stone-800">
    <div className="p-5 rounded-md bg-slate-200 shadow-2xl flex flex-col gap-3 items-center">
        <p className="text-2xl font-medium">Login!!</p>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit
          })=>(
             <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 items-center" method="get">
             <input className="p-2 rounded-md" type="text" name="userName" placeholder="Enter UserName" id="" value={values.userName} onChange={handleChange} onBlur={handleBlur}/>{errors.userName && touched.userName && errors.userName}
             <input className="p-2 rounded-md" type="text" name="password" placeholder="Enter Password" id="" 
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
             />{errors.password && touched.password && errors.password}

            <button type="submit" className="w-full p-2 bg-orange-300 rounded-md">Sign Up</button>
         </form>
          )}
        </Formik>
        <Link to="/register" className="text-center text-xs">New here? SignUp</Link>
    </div>
</div>
  )
}

export default LoginPage
