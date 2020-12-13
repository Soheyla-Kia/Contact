import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../Context'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Contact extends Component {
  constructor() {
    super()
    this.state = {
      showInfo: true,
    }
  }
  showClick = (e) => {
    this.setState({ showInfo: !this.state.showInfo })
  }
  removeContact = async (id, dispatch) => {
    const res = await axios.delete(
      'https://jsonplaceholder.typicode.com/users/${id}'
    )
    dispatch({
      type: 'DELETE_CONTACT',
      payload: id,
    })
  }
  render() {
    const { id, name, email, phone } = this.props.contact
    const { showInfo } = this.state
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value
          return (
            <div className='card card-body mb-2 shadow'>
              <img src='./images/profile.png' width='40' />
              <h4 className='mb-3'>
                {name}
                <i className='fas fa-sort-down' onClick={this.showClick}></i>
                <i
                  className='fas fa-times float-left text-danger'
                  onClick={this.removeContact.bind(this, id, dispatch)}
                ></i>
                <Link to={`/contact/edit/${id}`}>
                  <span
                    style={{
                      float: 'left',
                      color: 'blue',
                      fontSize: 13,
                      paddingTop: 10,
                      cursor: 'pointer',
                    }}
                  >
                    ویرایش
                  </span>
                </Link>
              </h4>
              {showInfo ? (
                <ul className='list-group'>
                  <li className='list-group-item'>{email}</li>
                  <li className='list-group-item'>{phone}</li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}
export default Contact
