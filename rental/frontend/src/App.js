import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sales from "./pages/sales";
import Members from "./pages/members";
import Sale from "./pages/sale";
import Member from "./pages/member";
import Finance from "./pages/finance";
import Main from "./pages/main";
import Classification from "./pages/classification";
import Menu from "./components/Menu";

function App() {
  const [current, setCurrent] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Menu current={current} setCurrent={setCurrent} />
          <Route exact path="/" component={Main} />
          <Route path="/finance" component={Finance} />
          <Route
            exact
            path="/sales/:saleId"
            component={Sale}
            current={current}
            setCurrent={setCurrent}
          />
          <Route
            exact
            path="/sales"
            component={Sales}
            current={current}
            setCurrent={setCurrent}
          />
          <Route
            exact
            path="/members/:memberId"
            component={() => (
              <Member current={current} setCurrent={setCurrent} />
            )}
          />
          <Route
            exact
            path="/members"
            component={() => (
              <Members current={current} setCurrent={setCurrent} />
            )}
          />
          <Route path="/classification" component={Classification} />
        </Router>
      </header>
    </div>
  );
}

export default App;
