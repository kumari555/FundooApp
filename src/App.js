import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ServiceComponent from './components/serviceComponent';
import Register from './pages/register';
import Signin from './pages/signin';
import ForgotPassword from './pages/forgotPassword';
import './App.css';
import Dashboard from './pages/dashboard';
import ArchivePage from './pages/archivePage';
import TrashPage from './pages/trashPage';
import RemainderPage from './pages/reminderPage';
import EditLabelPage from './pages/editLabelPage';
import DraftEditorPage from './pages/draftEditorPage';
import ShoppingPage from './pages/shoppingPage';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/serviceComponent' component={ServiceComponent}></Route>
          <Route path='/' exact component={ServiceComponent}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/signin' component={Signin}></Route>
          <Route path='/forgotPassword' component={ForgotPassword}></Route>
          <Route path='/dashboard' component={Dashboard}></Route>
          <Route path='/archivePage' component={ArchivePage}></Route>
          <Route path='/trashPage' component={TrashPage}></Route>
          <Route path='/reminderPage' component={RemainderPage}></Route>
          <Route path='/editLabelPage' component={EditLabelPage}></Route>
          <Route path='/draftEditorPage' component={DraftEditorPage}></Route>
          <Route path='/shoppingPage' component={ShoppingPage}></Route>
        </div>
      </Router>
    );
  }
}
export default App;
