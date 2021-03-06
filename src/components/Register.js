import React, { Component } from 'react'
import { Button, Grid, Header, Form, Segment } from 'semantic-ui-react';

import { api } from '../services/api';

const stateAbbreviations = [
  { key: 'AL', text: 'Alabama', value: 'AL' },
  { key: 'AK', text: 'Alaska', value: 'AK' },
  { key: 'AZ', text: 'Arizona', value: 'AZ' },
  { key: 'AR', text: 'Arkansas', value: 'AR' },
  { key: 'CA', text: 'California', value: 'CA' },
  { key: 'CO', text: 'Colorado', value: 'CO' },
  { key: 'CT', text: 'Connecticut', value: 'CT' },
  { key: 'DE', text: 'Delaware', value: 'DE' },
  { key: 'DC', text: 'Distrcit of Columbia', value: 'DC' },
  { key: 'FL', text: 'Florida', value: 'FL' },
  { key: 'GA', text: 'Georgia', value: 'GA' },
  { key: 'HI', text: 'Hawaii', value: 'HI' },
  { key: 'ID', text: 'Idaho', value: 'ID' },
  { key: 'IL', text: 'Illinois', value: 'IL' },
  { key: 'IN', text: 'Indiana', value: 'IN' },
  { key: 'IA', text: 'Iowa', value: 'IA' },
  { key: 'KS', text: 'Kansas', value: 'KS' },
  { key: 'KY', text: 'Kentucky', value: 'KY' },
  { key: 'LA', text: 'Louisiana', value: 'LA' },
  { key: 'ME', text: 'Maine', value: 'ME' },
  { key: 'MD', text: 'Maryland', value: 'MD' },
  { key: 'MA', text: 'Massachusetts', value: 'MA' },
  { key: 'MI', text: 'Michigan', value: 'MI' },
  { key: 'MN', text: 'Minneosta', value: 'MN' },
  { key: 'MS', text: 'Mississippi', value: 'MS' },
  { key: 'MO', text: 'Missouri', value: 'MO' },
  { key: 'MT', text: 'Montana', value: 'MT' },
  { key: 'NE', text: 'Nebraska', value: 'NE' },
  { key: 'NV', text: 'Nevada', value: 'NV' },
  { key: 'NH', text: 'New Hampshire', value: 'NH' },
  { key: 'NJ', text: 'New Jersey', value: 'NJ' },
  { key: 'NM', text: 'New Mexico', value: 'NM' },
  { key: 'NY', text: 'New York', value: 'NY' },
  { key: 'NC', text: 'North Carolina', value: 'NC' },
  { key: 'ND', text: 'North Dakota', value: 'ND' },
  { key: 'OH', text: 'Ohio', value: 'OH' },
  { key: 'OK', text: 'Oklahoma', value: 'OK' },
  { key: 'OR', text: 'Oregon', value: 'OR' },
  { key: 'PA', text: 'Pennsylvania', value: 'PA' },
  { key: 'RI', text: 'Rhode Island', value: 'RI' },
  { key: 'SC', text: 'South Carolina', value: 'SC' },
  { key: 'SD', text: 'South Dakota', value: 'SD' },
  { key: 'TN', text: 'Tennessee', value: 'TN' },
  { key: 'TX', text: 'Texas', value: 'TX' },
  { key: 'UT', text: 'Utah', value: 'UT' },
  { key: 'VT', text: 'Vermont', value: 'VT' },
  { key: 'VA', text: 'Virginia', value: 'VA' },
  { key: 'WA', text: 'Washington', value: 'WA' },
  { key: 'WV', text: 'West Virginia', value: 'WV' },
  { key: 'WI', text: 'Wisconsin', value: 'WI' },
  { key: 'WY', text: 'Wyojming', value: 'WY' }
]

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      schools: [],
      displaySchools: [],
      displaySchoolNames: [],
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      bio: '',
      avatarURL: 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png',
      school_id: null,
    }
  }

  componentDidMount() {
    api.schools.getSchools().then(schools => this.setState({ schools: schools }))
  }

  filterSchools = (evt, {value}) => {
    const filteredSchools = this.state.schools.filter(school => school.state === value)
    const schoolNames = filteredSchools.map(school => {
      let schoolObj = {key: school.name, text: school.name, value: school.name};
      return schoolObj;
    })

    // Because filtered schools filters thorugh all schools, using two separate arrays for schools
    // so that when a user makes a change in their selection the filter always starts with all schools
    this.setState({
      displaySchools: filteredSchools,
      displaySchoolNames: schoolNames,
    })
  }

  handleSchools = (evt, {value}) => {
    const school = this.state.schools.find(school => school.name === value)
    this.setState({ school_id: school.id})
  }

  handleUsername = evt => this.setState({ username: evt.target.value });
  handlePassword = evt => this.setState({ password: evt.target.value });
  handleFirstName = evt => this.setState({ firstName: evt.target.value });
  handleLastName = evt => this.setState({ lastName: evt.target.value });
  handleAge = evt => this.setState({ age: evt.target.value });
  handleBio = evt => this.setState({ bio: evt.target.value });
  handleAvatarURL = evt => this.setState({ avatarURL: evt.target.value });

  handleSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
    }

    const newProfile = {
      name: this.state.firstName + ' ' + this.state.lastName,
      age: this.state.age,
      bio: this.state.bio,
      avatarURL: this.state.avatarURL,
      school_id: this.state.school_id,
    }

    api.auth.register(newUser, newProfile).then(user => {
      if (user) {
        debugger
        this.props.handleLogin(user);
        this.props.history.push('/')
      } else {
        this.setState({ error: true })
      }
    })
  }

  
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as='h2' color='teal' textAlign='center'>
            Registration
          </Header>
          <Segment raised>
            <Form>
            <Form.Input label='Username' placeholder='Username' onChange={this.handleUsername} />
            {this.state.error ? <p className='Error'>Sorry, that username isn't unavailable</p> : null}
            <Form.Input label='Password' type='password' placeholder='Password' onChange={this.handlePassword} />
            <Form.Group widths='equal'>
              <Form.Input label='First Name' placeholder='Enter your first name' onChange={this.handleFirstName} />
              <Form.Input label='Last Name' placeholder='Enter your last name' onChange={this.handleLastName} />
              <Form.Input label='Age' type='number' placeholder={18} onChange={this.handleAge} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select
              label='State'
              options={stateAbbreviations}
              placeholder={`Select your school's state`}
              onChange={this.filterSchools}
              />
              <Form.Select
                label='School'
                options={this.state.displaySchoolNames}
                placeholder='Select your school'
                onChange={this.handleSchools}
              /> 
            </Form.Group>
            <Form.Input label='Profile Picture' placeholder='Picture URL' onChange={this.handleAvatarURL} />
            <Form.TextArea 
              label='Bio' 
              placeholder='Feel free to share anything about yourself here :)'
              onChange={this.handleBio}
              />
            <Button color='teal' onClick={this.handleSubmit}>Register</Button>
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register