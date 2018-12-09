import React, { Component } from 'react';

import { Container, Tab } from 'semantic-ui-react'
import Header from './header'
import Crypt from './crypt'
import Uncrypt from './uncrypt'

class App extends Component {
  render() {
    const panes = [
      { menuItem: 'Зашифрувати', render: () => <Tab.Pane attached={false}><Crypt /></Tab.Pane> },
      { menuItem: 'Розшифрувати', render: () => <Tab.Pane attached={false}><Uncrypt /></Tab.Pane> },
    ]

    return (
      <>
        <Header title='ШИФРИ ПЕРЕСТАНОВКИ' number={2} />
        <Container>
          <Tab menu={{ pointing: true }} panes={panes} />
        </Container>
      </>
    );
  }
}

export default App;
