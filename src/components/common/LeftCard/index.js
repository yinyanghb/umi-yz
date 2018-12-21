import { PureComponent } from 'react'

import styles from './style.less'
import {  Col, Card  } from 'antd';
import Spinner from './Spinner'


class LeftCard extends PureComponent {
  render(){
    const  { zhTitle , title , children ,DropdownProps} =this.props
   
    return (
      <Col lg={16} md={24} className={styles.leftCard} >
          <Card
            bordered={false}
            title={
              <>
                <h2>{zhTitle}</h2>
                <p>{title}</p>
              </>
            }
            extra={<Spinner {...DropdownProps} />}
            headStyle={{
              padding: '0 27px',
              color: '#fff',
              border: 'none'
            }}
          >
            {children}
          </Card>
        </Col>
    )
  }
}

export default LeftCard