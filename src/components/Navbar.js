import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  render() {

    return (
      <Menu color={'green'}>

        <Menu.Item>
          TransferU
        </Menu.Item>

        <Menu.Item position={'right'}>
          <Dropdown text='User'>
            <Dropdown.Menu direction={'left'}>
              <Dropdown.Item as={Link} to='/users/1' text='My Profile' />
              <Dropdown.Item text='New Event' />
              <Dropdown.Item text='My Events' />
              <Dropdown.Divider />
              <Dropdown.Item text='Logout' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

      </Menu>
    )
  }
}

export default Navbar;