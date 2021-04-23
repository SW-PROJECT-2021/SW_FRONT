import { Route, Switch } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signup";
function App() {
   return (
      <>
         <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Main} />
         </Switch>
      </>
   );
}

export default App;
