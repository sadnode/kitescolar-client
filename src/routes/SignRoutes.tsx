import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from '../pages/Home';

export function  SignRoutes() {
 return (
   <BrowserRouter>
     <Route path="/" component={Home} />
   </BrowserRouter>
 );
};
