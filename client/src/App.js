import React from 'react'

import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import Title from './components/layout/Title'

import { Layout } from 'antd'
import AddArtist from './components/forms/AddArtist'

import './App.css'
import Artists from './components/lists/Artists'

const { Content } = Layout

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='container'>
      <Content className='App'>
        <Title />
        <AddArtist />
        <Artists />
      </Content>
    </div>
  </ApolloProvider>
)

export default App
