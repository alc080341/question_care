import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Viewquestionnaireslist from "./UI_REACT_components/Viewquestionnaireslist";
import Addquestionnaire from "./UI_REACT_components/Addquestionnaire";
import Editquestionnaire from "./UI_REACT_components/Editquestionnaire";
import mainLogo from'./images/logo.png';
import Viewquestionnaire from "./UI_REACT_components/Viewquestionnaire"

class Header extends Component {

  render() {
    return (
      <HashRouter>
      <div className="header">
      <div>
      <img src={mainLogo} alt="logo"/>
      </div>
      <div className="header_nav">
        <div>
        <NavLink to="/viewquestionnaireslist">View all Questionnaires</NavLink>
        </div>
        <div>
        <NavLink to="/addquestionnaire">Add a new questionnaire</NavLink>
        </div>
        <div>
        <NavLink to="/login">Login to admin</NavLink>
        </div>

      </div>
      <div className="content">
      <Route exact path="/" component={Viewquestionnaireslist}/>
      <Route path="/viewquestionnaireslist" component={Viewquestionnaireslist}/>
      <Route path="/addquestionnaire" component={Addquestionnaire}/>
      <Route path="/editquestionnaire/:id" component={Editquestionnaire}/>
      <Route path="/viewquestionnaire/:id" component={Viewquestionnaire}/>
      </div>
      </div>
      </HashRouter>
      );
  }
}

export default Header;
