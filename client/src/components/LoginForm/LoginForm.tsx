import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

export interface ILoginResponse {
  data: {
    login: {
      token: string
    }
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($userInput: AddUserInput!) {
    login(userInput: $userInput) {
      token
    }
  }
`
const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(login: any) => (
        <Form
          onSubmit={(e: any) => {
            e.preventDefault()
            login({
              variables: {
                userInput: { email: form.email, password: form.password },
              },
            })
              .then((res: ILoginResponse) => {
                alert('login successful')
                const token = res.data.login.token
                console.log(token)
                localStorage.setItem('token', token)
              })
              .catch((err: Error) => alert(err.message))
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={(e: any) => handleChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e: any) => handleChange(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Mutation>
  )
}

export default LoginForm
