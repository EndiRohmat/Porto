import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import NewPassword from './Pages/NewPassword/NewPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import Home from './Pages/Home/Home'
import ListMenu from './Pages/ListMenu/ListMenu'
import Checkout from './Pages/Checkout/Checkout'
import SuccesCheckout from './Pages/Checkout/SuccesCheckout'
import MyClass from './Pages/MyClass/MyClass'
import Navbar from './Components/Navbar/Navbar'
import RegisterSuccess from './Pages/Register/RegisterSuccess'
import CourseDetail from './Pages/CourseDetail/CourseDetail'
import Invoices from './Pages/Invoices/Invoices'
import InvoiceDetail from './Pages/Invoices/InvoiceDetail'
import AdminView from './Pages/Admin/AdminView'
import DashboardAdmin from './Components/adminComponent/dashboardAdmin'
import ManageCourse from './Pages/Admin/ManageCourse'
import ManageCategory from './Pages/Admin/ManageCategory'
import ManagePaymentMethod from './Pages/Admin/ManagePaymentMethod'
import ManageInvoice from './Pages/Admin/ManageInvoice'
import AddUser from './Pages/Admin/AddUser'
import AddCourse from './Pages/Admin/AddCourse'
import AddPayment from './Pages/Admin/AddPayment'
import AddCategory from './Pages/Admin/AddCategory'
import UpdateUser from './Pages/Admin/UpdateUser'
import UpdateCourse from './Pages/Admin/UpdateCourse'
import UpdateCategory from './Pages/Admin/UpdateCategory'
import UpdatePayment from './Pages/Admin/UpdatePayment'
import UserInvoice from './Pages/Admin/UserInvoice'
import useAuth from './Hooks/useAuth'
import { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import PageNotFound from './Pages/Home/PageNotFound'
import AddSchedule from './Pages/Admin/AddSchedule'

function App() {
  const {payload} = useAuth()
  const [role, setRole] = useState('')
  useEffect(()=>{
    if(payload){
      const token = jwt(payload.token)
      setRole(token.role)
    }
  },[])

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/register/success' element={<RegisterSuccess/>}></Route>
          <Route path='/new-password' element={<NewPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword/>}></Route>
          <Route path='/type-course/:typeId' element={<ListMenu/>}></Route>
          <Route path='/course-detail/:courseId' element={<CourseDetail />}></Route> 
          <Route path='/my-class' element={<MyClass />}></Route>
          <Route path='/invoices' element={<Invoices />}></Route> 
          <Route path='/invoices/detail/:invoiceId' element={<InvoiceDetail/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route> 
          <Route path='/checkout/success' element={<SuccesCheckout />}></Route>
        </Route>
        {role === 'admin' && 
        <Route path='/admin-view' element={<DashboardAdmin/>}>
          <Route index element={<AdminView/>}></Route>
          <Route path='/admin-view/add-user' element={<AddUser/>}></Route>
          <Route path='/admin-view/update-user/:id' element={<UpdateUser/>}></Route>
          <Route path = "manage-course" element = {<ManageCourse/>} />
          <Route path='/admin-view/add-course' element={<AddCourse/>}></Route>
          <Route path='/admin-view/update-course/:id' element={<UpdateCourse/>}></Route>
          <Route path='/admin-view/add-schedule/:courseName/:courseId' element={<AddSchedule/>}></Route>
          <Route path = "manage-category" element = {<ManageCategory/>} />
          <Route path='/admin-view/add-category' element={<AddCategory/>}></Route>
          <Route path='/admin-view/update-category/:id' element={<UpdateCategory/>}></Route>
          <Route path = "manage-payment" element = {<ManagePaymentMethod/>} />
          <Route path='/admin-view/add-payment' element={<AddPayment/>}></Route>
          <Route path='/admin-view/update-payment/:id' element={<UpdatePayment/>}></Route>
          <Route path = "manage-invoice" element = {<ManageInvoice/>} />
          <Route path='/admin-view/detail-invoice/:id' element={<UserInvoice/>}></Route>
        </Route>
        }
          {/* <Route path = "*" element = {<PageNotFound/>} /> */}
      </Routes>
    </Router>
  )
}

export default App
