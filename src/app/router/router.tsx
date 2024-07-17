import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../../view/_layouts/app";
import { Authlayout } from "../../view/_layouts/authlayout";
import { NotFound } from "../../view/pages/404";
import { Dashboard } from "../../view/pages/app/dashboard/dashboard";
import { Orders } from "../../view/pages/app/orders";
import { Signin } from "../../view/pages/auth/signin";
import { SignUp } from "../../view/pages/auth/signup";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/" element={<Authlayout />}>
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
