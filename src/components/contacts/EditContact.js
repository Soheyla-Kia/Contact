import React, { Component } from 'react'
import { Consumer } from '../../Context'
import { v4 as uuid } from 'uuid'
import TextInput from '../layout/TextInput'
import axios from 'axios'
import { sync } from 'glob'
export default class EditContact extends Component {
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
  updateContact = async (dispatch, e) => {
    e.preventDefault()
    const { id } = this.props.match.params
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
    const data = {
      id,
      name,
      email,
      phone,
    }
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      data
    )
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data })
    this.setState({
      name: '',
      email: '',
      phone: '',
    })
    this.props.history.push('/')
  }
  async componentDidMount() {
    const { id } = this.props.match.params
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    const contact = res.data
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      error: {},
    })
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
                <form onSubmit={this.updateContact.bind(this, dispatch)}>
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
                      value='ویرایش کاربر'
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
