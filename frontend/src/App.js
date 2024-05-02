import { Route, Routes } from 'react-router-dom';

import SignUp from './pages/website/Authenction/SignUp'
import SignIn from './pages/website/Authenction/SignIn';
import Home from './pages/dashboard/Home';
import Users from './pages/dashboard/user/Users';
import EditUser from './pages/dashboard/user/EditUser';
import CreateUser from './pages/dashboard/user/CreateUser';
import Products from './pages/dashboard/products/Products';
import CreateProduct from './pages/dashboard/products/CreateProduct';
import EditProduct from './pages/dashboard/products/EditProduct';
import RequireAuth from './pages/website/Authenction/RequireAuth';
import PersistLogin from './pages/website/Authenction/PersistLogin';
import Inventory from './pages/dashboard/Inventory';
import Dashboard from './pages/dashboard/dashboard/Dashboard';
import About from './pages/website/About';
import Clients from './pages/dashboard/Client/Client';
import EditClient from './pages/dashboard/Client/EditClient';
import CreateClient from './pages/dashboard/Client/CreateClient';
import Deposit from './pages/dashboard/desposit/Deposit';
import EditDeposit from './pages/dashboard/desposit/EditDeposit';
import CreateDeposit from './pages/dashboard/desposit/CreateDeposit';
import Categorie from './pages/dashboard/categorie/Categorie';
import EditCategorie from './pages/dashboard/categorie/EditCategorie';
import CreateCategorie from './pages/dashboard/categorie/CreateCategorie';
import MakeOrderPage from './pages/dashboard/Invoice';
import Sell from './pages/dashboard/Sell';
import Facture from './pages/dashboard/facture/Facture';
import EditFacture from './pages/dashboard/facture/EditFacture';
import CreateFacture from './pages/dashboard/facture/CreateFacture';
import Bon from './pages/dashboard/bon/Bon';
import CreateBon from './pages/dashboard/bon/CreateBon';
import EditBon from './pages/dashboard/bon/EditBon';
import ProductFact from './pages/dashboard/prodfact/ProductFact';
import EditProductFact from './pages/dashboard/prodfact/EditProductFact';
import CreateProductFact from './pages/dashboard/prodfact/CreateProductFact';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<SignUp />} />
                <Route path='/login' element={<SignIn />} />
                {/* Protected Routes*/}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route element={<Home />}>
                            {/* <Route path='/' element={<Dashboard />} /> */}
                            <Route path='users' element={<Users />} />
                            <Route path='users/:id' element={<EditUser />} />
                            <Route path='users/createuser' element={<CreateUser />} />
                            <Route path='invoice' element={<MakeOrderPage />} />
                            <Route path='/' element={<Sell />} />
                            <Route path='facture' element={<Facture />} />
                            <Route path='facture/:id' element={<EditFacture />} />
                            <Route path='facture/add' element={<CreateFacture />} />
                            <Route path='bon' element={<Bon />} />
                            <Route path='bon/:id' element={<EditBon />} />
                            <Route path='bon/add' element={<CreateBon />} />
                            <Route path='fact' element={<ProductFact />} />
                            <Route path='fact/:id' element={<EditProductFact />} />
                            <Route path='fact/add' element={<CreateProductFact />} />
                            <Route path='inventory' element={<Inventory />} />
                            <Route path='inventory/products' element={<Products />} />
                            <Route path='inventory/products/:id' element={<EditProduct />} />
                            <Route path='inventory/products/create' element={<CreateProduct />} />
                            <Route path='inventory/client' element={<Clients />} />
                            <Route path='inventory/client/:id' element={<EditClient />} />
                            <Route path='inventory/client/addclient' element={<CreateClient />} />
                            <Route path='inventory/deposit' element={<Deposit />} />
                            <Route path='inventory/deposit/:id' element={<EditDeposit />} />
                            <Route path='inventory/deposit/adddeposit' element={<CreateDeposit />} />
                            <Route path='inventory/categorie' element={<Categorie />} />
                            <Route path='inventory/categorie/:id' element={<EditCategorie />} />
                            <Route path='inventory/categorie/add' element={<CreateCategorie />} />
                            <Route path='about' element={<About />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
