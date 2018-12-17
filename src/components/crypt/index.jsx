import React, { Component } from 'react'

import { Form, Message, Button, Input, Grid } from 'semantic-ui-react'
import { css } from 'aphrodite'
import styles from './styles'
import { setMessage } from '../../actions/setMessage'

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
    let gammaIndex = 0
    this.setState({ error: '' })
    text = text.replace(/\s/g, '')

    if (!text.trim()) {
      this.setState({ error: 'Уведіть повідомлення' })
    } else {
      let cryptText = text.split('').map(char => {
        return char.charCodeAt(0).toString(2);
      })

      let gamma = key.split('').map(char => {
        return char.charCodeAt(0).toString(2)
      })
      let newCrypt = cryptText.map(char => {
        let newBynar = []
        char.split('').forEach(c => {
          gammaIndex++
          if (gammaIndex === key.length - 1) gammaIndex = 0
          if (c == 0 && gamma[gammaIndex][gammaIndex] == 0) newBynar.push(0)
          if (c == 1 && gamma[gammaIndex][gammaIndex] == 1) newBynar.push(0)
          if (c == 0 && gamma[gammaIndex][gammaIndex] == 1) newBynar.push(1)
          if (c == 1 && gamma[gammaIndex][gammaIndex] == 0) newBynar.push(1)
        })
        return newBynar.join('')
      })

      setMessage(text, key, newCrypt.join(' '))
      this.setState({ cryptText: newCrypt.join(' ') })
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
                  <label className={css(styles.label)}>Гамма</label>
                  <Form.Input placeholder='Гамма' onChange={({ target }) => this.setState({ key: target.value })} />
                </Form.Field>
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