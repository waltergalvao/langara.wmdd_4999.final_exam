import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import {ApolloClient, InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import {createHttpLink} from 'apollo-link-http'
import Title from './components/layout/Title'

import {Layout} from 'antd'
import AddArtist from './components/forms/AddArtist'

import './App.css'
import Artists from './components/lists/Artists'
import AddInstrument from "./components/forms/AddInstrument";
import ArtistDetails from "./components/card/ArtistDetails";

const {Content} = Layout

const client = new ApolloClient({
    link: createHttpLink({uri: 'http://localhost:4000/graphql'}),
    cache: new InMemoryCache()
})

const App = () => (
    <ApolloProvider client={client}>
        <div className='container'>
            <Content className='App'>

                <Router>
                    <Switch>
                        <Route path="/artists/:id">
                            <ArtistDetails/>
                        </Route>
                        <Route path="/">
                            <Title/>
                            <AddArtist/>
                            <AddInstrument/>
                            <Artists/>
                        </Route>
                    </Switch>
                </Router>
            </Content>
        </div>
    </ApolloProvider>
)

export default App
