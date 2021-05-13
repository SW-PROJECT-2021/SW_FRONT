import { BrowserRouter, Route, Switch } from "react-router-dom";
import Address from "./commons/address";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
function App() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/address" component={Address} />
            <Route path="/" component={Main} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
