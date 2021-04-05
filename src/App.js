import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import User from "./pages/user";

function App() {
   return (
      <>
         <Router>
            <Switch>
               <Route exact path="/admin" component={Admin} />
               <Route exact path="/auth" component={Login} />
               <Route path="/" component={User} />
            </Switch>
         </Router>
      </>
   );
}

export default App;
