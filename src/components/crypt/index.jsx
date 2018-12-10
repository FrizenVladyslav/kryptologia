import React, { Component } from 'react'

import { Form, Message, Button, Input, Grid } from 'semantic-ui-react'
import { css } from 'aphrodite'
import styles from './styles'

class Crypt extends Component {
  state = {
    text: '',
    key: '',
    cryptText: '',
    error: '',
  }

  handleClick() {
    const { text } = this.state

    this.cryptMessage(text)
  }

  cryptMessage(text) {
    this.setState({ error: '' })
    text = text.replace(/\s/g, '')

    if (!text.trim()) {
      this.setState({ error: 'Уведіть повідомлення' })
    } else {
      let cryptText = text.split('').map(char => {
        return char.charCodeAt(0).toString(2);
      }).join(' ');

      this.setState({ cryptText })
    }
  }

  render() {
    return (
      <>
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column computer={12}>
              <Form>
                <Form.Field>
                  <label className={css(styles.label)}>Повiдомлення яке потрiбно зашифрувати</label>
                  <Form.TextArea placeholder='Повiдомлення' onChange={({ target }) => this.setState({ text: target.value })} />
                </Form.Field>
                <Button
                  style={{ marginTop: 20 }}
                  icon='user secret'
                  content='Зашифрувати'
                  labelPosition='left'
                  onClick={() => this.handleClick()}
                />
              </Form>
              {!this.state.cryptText ? null :
                <Message
                  icon='comment alternate'
                  header='Повiдомлення зашифроване'
                  content={this.state.cryptText}
                />
              }
              {!this.state.error ? null :
                <Message negative>
                  <Message.Header>Помилка шифрування</Message.Header>
                  <p>{this.state.error}</p>
                </Message>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default Crypt