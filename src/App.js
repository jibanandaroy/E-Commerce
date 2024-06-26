
import './App.css';
import { Navber } from './Component/Navber/Navber';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Component/Footer/Footer';
import men_banner from './Component/Assets/banner_mens.png'
import women_banner from './Component/Assets/banner_women.png'
import kid_banner from './Component/Assets/banner_kids.png'
import Admin from './Admin/components/Admin/Admin'
import AddProduct from './Admin/components/AddProduct/AddProduct'
import axios from 'axios';
import Listproduct from './Admin/components/ListProduct/Listproduct';
import { PrivateRoute } from './Route/PrivateRoute';
import { ForgetPass } from './Pages/ForgetPass';
import MyOrders from './Component/MyOrders/MyOrders';
import ListOrder from './Admin/components/ListOrder/ListOrder';
import { AdminPrivateRoute } from './Route/AdminPrivateRoute';
import EditProduct from './Admin/components/EditProduct/EditProduct';

function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;


  return (
    <div >
      <BrowserRouter>
        <Navber />
        <Routes>
          <Route path='/' element={<Shop />}></Route>
          <Route path='/login' element={<LoginSignup />}></Route>
          <Route path='/forgetpass' element={<ForgetPass />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />}></Route>
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />}></Route>
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />}></Route>
            <Route path='/product' element={<Product />}>
              <Route path=':productId' element={<Product />}></Route>
            </Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/myorders' element={<MyOrders />}></Route>
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/admin/addproduct' element={<AddProduct />}></Route>
            <Route path='/admin/listproduct' element={<Listproduct />}></Route>
            <Route path='/admin/listorder' element={<ListOrder />}></Route>
            <Route path='/admin/editProduct/:id' element={<EditProduct/>}></Route>
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
