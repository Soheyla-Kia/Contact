import React, { Component } from 'react'
import { Consumer } from '../../Context'
import { v4 as uuid } from 'uuid'
import TextInput from '../layout/TextInput'
import axios from 'axios'
import { sync } from 'glob'
export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    error: {},
  }
  onStateChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  addContact = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone } = this.state
    if (name === '') {
      this.setState({ error: { name: 'وارد کردن نام اجباری است' } })
      return
    }
    if (email === '') {
      this.setState({ error: { email: 'وارد کردن ایمیل اجباری است' } })
      return
    }
    if (phone === '') {
      this.setState({ error: { phone: 'وارد کردن شماره موبایل اجباری است' } })
      return
    }
    const contact = {
      id: uuid(),
      name,
      email,
      phone,
    }

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      contact
    )
    dispatch({ typ: 'ADD_CONTACT', payload: res.data })

    this.setState({
      name: '',
      email: '',
      phone: '',
    })
    this.props.history.push('/')
  }

  render() {
    const { name, email, phone, error } = this.state

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value
          return (
            <div className='card mb-4'>
              <div className='card-header'>اضافه کردن مخاطب</div>
              <div className='card-body'>
                <form onSubmit={this.addContact.bind(this, dispatch)}>
                  <TextInput
                    lable='نام'
                    name='name'
                    value={name}
                    placeholder='نام را وارد کنید'
                    onChange={this.onStateChange}
                    error={error.name}
                  />
                  <TextInput
                    lable='ایمیل'
                    name='email'
                    value={email}
                    placeholder='ایمیل را وارد کنید'
                    onChange={this.onStateChange}
                    type='email'
                    error={error.email}
                  />
                  <TextInput
                    lable='موبایل'
                    name='phone'
                    value={phone}
                    placeholder='موبایل را وارد کنید'
                    onChange={this.onStateChange}
                    error={error.phone}
                  />

                  <div>
                    <input
                      type='submit'
                      value='اضافه کردن کاربر'
                      className='btn btn btn-success btn-block'
                    />
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
