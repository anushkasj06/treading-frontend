import React from "react";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./Pages/Portfolio/Porfolio";
import Activity from "./Pages/Activity/Activity";
import Wallet from "./Pages/Wallet/Wallet";
import Withdrawal from "./Pages/Withdrawal/Withdrawal";
import PaymentDetails from "./Pages/PaymentDetails/Paymentdetails";
import StockDetails from "./Pages/StockDetails/StockDetails";
import WatchList from "./Pages/WatchList/WatchList";
import Profile from "./Pages/Profile/Profile";
import SearchCoin from "./Pages/Search/SearchCoin";
import NotFound from "./Pages/NotFound/NotFound";
// import WithdrawalAdmin from "./Pages/Admin/WithdrawalAdmin";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/market/:id" element={<StockDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchCoin />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/admin/withdrawal" element={<WithdrawalAdmin />} /> */}
      </Routes>
    </>
  );
}