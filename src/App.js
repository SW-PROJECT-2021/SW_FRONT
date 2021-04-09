import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Main from "./pages/main";

function App() {
   return (
      <>
         <Router>
            <Switch>
               <Route exact path="/admin" component={Admin} />
               <Route exact path="/auth" component={Login} />
               <Route path="/" component={Main} />
            </Switch>
         </Router>
      </>
   );
}

export default App;
