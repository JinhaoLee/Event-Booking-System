import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { LoginForm } from './components'
import Container from 'react-bootstrap/Container'

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: 'http://localhost:5000/',
})

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Container>
        <LoginForm />
      </Container>
    </div>
  </ApolloProvider>
)

export default App
