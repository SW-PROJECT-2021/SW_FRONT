import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";
import User from "./pages/user";
import SignUp from "./pages/signup";
function App() {
  return (
    <>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact={true} component={User} />
      </Switch>
    </>
  );
}

export default App;
