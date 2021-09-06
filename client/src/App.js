import { Box, Grommet } from 'grommet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme } from './grommetTheme';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo.config';
import PageHeader from './components/PageHeader';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import UserHistory from './pages/UserHistory'


export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Grommet theme={theme} background='dark' >
          <Box
            // width={`${windowWidth}px`}
            // height={`${windowHeight}px`}
            fill
          >
            <PageHeader />
            <Switch>
              <Box
                fill
                justify="center"
                align="center"
                background="dark"
                overflow={{ horizontal: 'hidden', vertical: 'hidden' }}
              >
                <Route exact path='/' component={HomePage} />
                <Route exact path='/sign-up' component={SignUp} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/health' component={UserHome} />
                <Route exact path='/user-history/:id' component={UserHistory} />
              </Box>
            </Switch>
          </Box>
        </Grommet>
      </Router>
    </ApolloProvider>
  );
};
