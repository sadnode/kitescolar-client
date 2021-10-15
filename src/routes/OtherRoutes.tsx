import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { LoginPage } from "../pages/Login";

export function OtherRoutes() {
 return (
   <BrowserRouter>
     <Route path="/" component={LoginPage} />
   </BrowserRouter>
 );
};
