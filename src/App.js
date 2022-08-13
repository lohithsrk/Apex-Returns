import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.page';
import Orders from './pages/Orders.page';
import Deposit from './pages/Deposit.page';
import Plans from './pages/Plans.page';
import Me from './pages/Me.page';
import Auth from './pages/Auth.page';
import Payment from './pages/Payment.page';
import Withdraw from './pages/Withdraw.page';
import About from './pages/About.page';

import DepositeVerify from './pages/admin/DepositeVerify.page';
import UtilsAlter from './pages/admin/UtilsAlter.page';
import WithdrawRequest from './pages/admin/WithdrawRequest.page';

import UserRoute from './routes/User.route';
import AdminRoute from './routes/Admin.route';

const App = () => {

  const { user } = useSelector(state => ({ ...state }))

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      < Routes >
        {user && user.user.role === 'standard' ? <>
          <Route path="/" element={<UserRoute />} >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="deposit" element={<Deposit />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="plans" element={<Plans />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="me" exact element={<Me />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="/deposit/apex/payment" element={<Payment />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="/withdraw" element={<Withdraw />} />
          </Route>
          <Route path="/" element={<UserRoute />} >
            <Route path="/about" element={<About />} />
          </Route></>
          : <>
            <Route path="/" element={<AdminRoute />} >
              <Route path="/" element={<UtilsAlter />} />
            </Route>
            <Route path="/" element={<AdminRoute />} >
              <Route path="/withdraw" element={<WithdrawRequest />} />
            </Route>
            <Route path="/" element={<AdminRoute />} >
              <Route path="/deposit" element={<DepositeVerify />} />
            </Route>
          </>}

        <Route path="/login" element={<Auth />} />
        <Route path="/signup" exact element={<Auth />} />
        <Route path="*" exact element={<p>404</p>} />
      </Routes>
    </div >
  )
}
export default App;
