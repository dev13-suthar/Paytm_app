import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./UI/loginPage"
import Register from "./UI/registerPage"
import Layout from "./UI/layout"
import HomePage from "./UI/homePage"
import { RecoilRoot } from "recoil"

function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Layout/>}>
            <Route path="/home" element={<HomePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
