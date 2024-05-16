
import { Link, useNavigate } from "react-router-dom"
import {Formik} from "formik"

const initialValues = {
    firstName:"",
    lastName:"",
    userName:"",
    password:""
}
const Register = () => {
  const navigate = useNavigate();
  const sendApis = async(values)=>{
    try {
        const res = await fetch("http://localhost:7001/user/v1/signUp",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(values)
        });
        const data = await res.json();
        console.log(data);
        navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const subMitForm = async(values,helper)=>{
        await sendApis(values);
        helper.resetForm();
  }
  return (
    <div className="flex items-center justify-center p-3 h-[90vh] w-full text-stone-800">
        <div className="p-5 rounded-md bg-slate-200 shadow-2xl flex flex-col gap-3 items-center">
            <p className="text-2xl font-medium">Register Yourself</p>
           <Formik initialValues={initialValues} onSubmit={subMitForm}>
                {({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                })=>(
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                        <input
                        name="firstName"
                        placeholder="first Name"
                        className="p-2 rounded-md"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        />
                        {errors.firstName && touched.firstName && errors.firstName}

                        <input
                        name="lastName"
                        placeholder="LastName"
                        className="p-2 rounded-md"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        />
                        {errors.lastName && touched.lastName && errors.lastName}

                        <input
                        name="userName"
                        placeholder="UserName"
                        className="p-2 rounded-md"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                        />
                        {errors.userName && touched.userName && errors.userName}

                        <input
                        name="password"
                        placeholder="Password"
                        className="p-2 rounded-md"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        />
                        {errors.password && touched.password && errors.password}

                        <button className="w-full bg-orange-300 p-2 rounded-md">SignUp</button>
                    </form>
                )}
           </Formik>
            <Link to={"/"} className="text-center text-xs">Already have Account? LogInn</Link>
        </div>
    </div>
  )
}

export default Register

{/* <input className="p-2 rounded-md" type="text" name="firstName" placeholder="Enter FirstName" id="" />
<input className="p-2 rounded-md" type="text" name="LastName" placeholder="Enter LastName" id="" />
<input className="p-2 rounded-md" type="text" name="UserName" placeholder="Enter UserName" id="" />
<input className="p-2 rounded-md" type="text" name="Password" placeholder="Enter Password" id="" /> */}