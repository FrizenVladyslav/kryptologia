import React, { Component } from 'react'

import { Form, Message, Button, Input, Grid } from 'semantic-ui-react'
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
    const { text } = this.state

    this.uncryptMessage(text)
  }

  uncryptMessage(text) {
    let cryptText = '';

    if (!text.trim()) {
      this.setState({ error: 'Уведіть повідомлення' })
    } else {
      for (let i = 0; i < (text.length / 8); i++) {
        let word = text.substr(i * 8, 8);
        word = parseInt(word, 2);
        cryptText += String.fromCharCode(word);
      }

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

export default Uncrypt