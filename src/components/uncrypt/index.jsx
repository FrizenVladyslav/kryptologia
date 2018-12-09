import React, { Component } from 'react'

import { Form, Message, Button, Input, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { css } from 'aphrodite'
import styles from './styles'

class Uncrypt extends Component {
  state = {
    text: '',
    key: '',
    cryptText: '',
    error: '',
  }

  handleClick() {
    const { text, key } = this.state

    this.uncryptMessage(text, key)
  }

  uncryptMessage(text, key) {
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
        for (let i = 0; i < text.length; i += text.length / key.length) {
          message[sortKey[keySymbol]] = text.slice(i + 1, i + 1 + text.length / key.length)
          keySymbol++
        }
        if (message[sortKey[0]].length - message[sortKey[1]].length < 0) {
          for (let i = 0; i <= message[sortKey[1]].length - message[sortKey[0]].length; i++) {
            message[sortKey[0]] = ' ' + message[sortKey[0]]
          }
        }
        for (let i = 0; i < text.length / key.length; i++) {
          for (let j = 0; j < key.length; j++) {
            cryptMessage.push(message[key[j]][i])
          }
        }
      }
      console.log('message', message)
      console.log('cryptMessage', cryptMessage)
      if(key == this.props.keyMessage && text == this.props.cryptMessage){
        this.setState({ cryptText: this.props.message.toLowerCase().replace(/\s/g, '') })
      } else {
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
                  <label className={css(styles.label)}>Повiдомлення яке потрiбно розшифрувати</label>
                  <Form.TextArea placeholder='Повiдомлення' onChange={({ target }) => this.setState({ text: target.value })} />
                </Form.Field>
                <Button
                  style={{ marginTop: 20 }}
                  icon='low vision'
                  content='Розшифрувати'
                  labelPosition='left'
                  onClick={() => this.handleClick()}
                />
              </Form>
              {!this.state.cryptText ? null :
                <Message
                  icon='comment alternate'
                  header='Повiдомлення розшифроване'
                  content={this.state.cryptText}
                />
              }
              {!this.state.error ? null :
                <Message negative>
                  <Message.Header>Помилка розшифрування</Message.Header>
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

export default connect(({ crypt }) => ({
  message: crypt.message,
  keyMessage: crypt.key,
  cryptMessage: crypt.cryptMessage,
}))(Uncrypt)