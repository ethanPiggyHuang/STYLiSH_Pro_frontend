import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Checkout from './pages/Checkout/Checkout';
import Home from './pages/Home/Home';
import ThankYou from './pages/ThankYou/ThankYou';
import Product from './pages/Product/Product';
import Profile from './pages/Profile/Profile';
import Promote from './pages/Admin/Promote';
import Analyze from './pages/Admin/Analyze';
import AdminOrders from './pages/Admin/AdminOrders';
import Messages from './pages/Admin/Messages';
const root = ReactDOM.createRoot(document.getElementById('root'));

const data = [
  { year: 2010, value: 10 },
  { year: 2011, value: 15 },
  { year: 2012, value: 10 },
  { year: 2013, value: 65 },
  { year: 2014, value: 50 },
];

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin/promote" element={<Promote />} />
        <Route path="admin/analyze" element={<Analyze data={data} />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/messages" element={<Messages />} />
        <Route path="admin" element={<Navigate to="admin/analyze" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
