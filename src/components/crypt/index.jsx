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
    const { text, key } = this.state

    this.cryptMessage(text, key)
  }

  cryptMessage(text, key) {
    let message = {}
    let cryptMessage = []
    text = text.toLowerCase()
    key = key.toLowerCase()
    let sortKey = key.split('').sort()

    this.setState({ error: '' })

    if (text.trim().length == 0 || key.trim().length == 0) {
      if (text.trim().length == 0) this.setState({ error: 'Введiть повiдомлення' })
      if (key.trim().length == 0) this.setState({ error: 'Введiть ключ' })
    } else {
      if (text.trim().length < key.trim().length) {
        this.setState({ error: 'Повiдомлення повине бути бiльше за ключ' })
      } else {
        let keySymbol = 0
        for (let i = 0; i < key.length; i++) {
          message[key[i]] = []
        }
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') continue
          if (keySymbol == key.length) {
            keySymbol = 0
          }
          message[key[keySymbol]].push(text[i])
          keySymbol++
        }
        sortKey.forEach(item => {
          cryptMessage = [...cryptMessage, ...message[item]]
        })
        this.setState({ cryptText: cryptMessage })
      }
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
                  <label className={css(styles.label)}>Ключ шифрування</label>
                  <Input placeholder='Ключ' onChange={({ target }) => this.setState({ key: target.value })} />
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