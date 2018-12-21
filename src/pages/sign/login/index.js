import React, { PureComponent ,Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Icon, Input } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
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
        <div className="text-center mb20">
          <img src='/logo_login.png' width="180" />
          </div>
          <FormItem hasFeedback>
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(255,255,255,1)'  }} />} onPressEnter={this.handleOk} placeholder={'Username'} />)}
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
              prefix={<Icon type="lock" style={{ color: 'rgba(255,255,255,1)' }} />}
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
          <div className="text-center mt20">
          <Link to='/account/profit' className="vm color-blue">
            Forget password
          </Link>
          <span className="vm color-blue ml10 mr10">|</span>
          <Link to='/account/profit' className="vm color-blue">
            Reset password
          </Link>
          </div>
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