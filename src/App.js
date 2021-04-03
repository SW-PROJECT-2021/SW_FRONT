import { HashRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";

function App() {
   return (
      <>
         <Router>
            <Route exact path="/" component={Main} />
            <Route exact path="/auth" component={Login} />
         </Router>
      </>
   );
}

export default App;
