import { Outlet } from "react-router-dom"
import Appbar from "../../comps/Appbar"

const Layout = () => {
  return (
    <>
        <Appbar/>
        <Outlet/>
    </>
  )
}

export default Layout
