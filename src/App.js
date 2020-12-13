import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Contacts from './components/contacts/Contacts.js'
import Header from './components/layout/Header'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from './Context'
import AddContact from './components/contacts/AddContact'
import About from './components/page/About'
import NotFound from './components/page/NotFound'
import EditContact from './components/contacts/EditContact'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className='App'>
            <Header title='مدیریت مخاطبین ' />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Contacts} />
                <Route exact path='/about' component={About} />
                <Route exact path='/contact/add' component={AddContact} />
                <Route exact path='/contact/edit/:id' component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
