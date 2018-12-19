import React from 'react'

import { Header, Segment, Icon, Rail } from 'semantic-ui-react'

const PageHeader = ({ number, title }) => {

  return (
    <>
      <Header as='h2'attached='top'>
        <Icon name='student' />
        <Header.Content >
          Прикладна криптологія
          <Header.Subheader>Лабораторна робота N {number} - {title}</Header.Subheader>
          <Header.Subheader>Фрiзен Владислав, Байрак Анатолій, Обєдін Денис</Header.Subheader>
        </Header.Content >
      </Header>
      
    </>
  )
}

export default PageHeader