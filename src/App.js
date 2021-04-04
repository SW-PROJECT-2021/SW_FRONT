import { HashRouter as Router, Route } from "react-router-dom";
import Footer from "./commons/Footer";
import Header from "./commons/header/Header";
import Login from "./pages/login";
import Main from "./pages/main";

function App() {
   return (
      <>
         <Router>
            <Header />
            <Route exact path="/" component={Main} />
            <Route exact path="/auth" component={Login} />
            <Footer />
         </Router>
      </>
   );
}

export default App;
