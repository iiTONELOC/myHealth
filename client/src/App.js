import { Box, Grommet, Grid } from 'grommet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme, gridAreas } from './grommetTheme';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo.config';
import PageHeader from './components/PageHeader';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserHome from './pages/UserHome';


export default function App() {
  return (

    <ApolloProvider client={client}>
      <Router>
        <Grommet theme={theme} background='dark'>
          <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={gridAreas}
            background='dark'
          >
            <PageHeader />
            <Box gridArea="main" justify="center" align="center" background="dark_1" pad='3px'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/sign-up' component={SignUp} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/health' component={UserHome} />
              </Switch>
            </Box>
          </Grid>

        </Grommet>
      </Router>
    </ApolloProvider>

  );
};
