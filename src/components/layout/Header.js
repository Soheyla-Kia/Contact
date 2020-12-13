import React from 'react'
import PropTypes from 'prop-types'
import './header.css'
import { Link } from 'react-router-dom'
const Header = (props) => {
  const { title } = props
  return (
    <div className='nav navbar navbar-expand-md navbar-dark bg-info py-2 mb-2'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          {title}
        </a>
        <div>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                <i className='fa fa-home'></i> خانه
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/contact/add'>
                <i className='fas fa-plus'></i> افزودن
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                <i className='fas fa-question'></i> درباره ما
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
Header.defaultProps = {
  title: 'اپلیکیشن ما',
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header
