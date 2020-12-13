import React, { Component } from 'react'
import Contact from './Contact'
import { Consumer } from '../../Context'
class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          return (
            <React.Fragment>
              <h1 className='display-5 text-info'>لیست مخاطبان</h1>
              {value.contacts.map((contact) => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          )
        }}
      </Consumer>
    )
  }
}
export default Contacts
