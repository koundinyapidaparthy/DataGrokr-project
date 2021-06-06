import ContactsFile from "./ContactsFile/ContactsFile";
import ConfirmFile from "./ContactsFile/ConfirmFile";
import {BrowserRouter as Router,Route,Switch,} from  "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        <ContactsFile />
        </Route>
        <Route path="/confirmation">
          <ConfirmFile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
