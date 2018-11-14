import React, { PureComponent ,Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Icon, Input } from 'antd'
import { connect } from 'dva'
import styles from './style.less'
const FormItem = Form.Item
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent{
  handleOk = () =>{
    const {form,dispatch}= this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors,values)=>{
      if(errors){
        return;
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render(){
    const {form} = this.props
    const { getFieldDecorator } = form

    return (
     <Fragment>
        <div className={styles.form}>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.handleOk} placeholder={'Username'} />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  
                }
              ]
            })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                onPressEnter={this.handleOk}
                placeholder={`Password`}
              />
            )}
          </FormItem>
          <Row>
            <Button
              type='primary'
              onClick={this.handleOk}

            >
              LOGIN
            </Button>
          </Row>
        </form>
        </div>
     </Fragment>
    )
  }
}
Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Login