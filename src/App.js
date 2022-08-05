import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.page';
import Orders from './pages/Orders.page';
import Deposite from './pages/Deposite.page';
import Team from './pages/Team.page';
import Me from './pages/Me.page';
import Auth from './pages/Auth.page';
import Payment from './pages/Payment.page';

import UserRoute from './routes/User.route';

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<UserRoute />} >
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<UserRoute />} >
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/" element={<UserRoute />} >
          <Route path="deposite" element={<Deposite />} />
        </Route>
        <Route path="/" element={<UserRoute />} >
          <Route path="team" element={<Team />} />
        </Route>
        <Route path="/" element={<UserRoute />} >
          <Route path="me" exact element={<Me />} />
        </Route>
        <Route path="/" element={<UserRoute />} >
          <Route path="/deposite/apex/payment" element={<Payment />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" exact element={<Auth />} />
        <Route path="*" exact element={<p>404</p>} />
      </Routes>
    </div>
  )
}
export default App;