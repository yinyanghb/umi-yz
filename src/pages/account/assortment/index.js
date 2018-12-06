import React, { PureComponent } from 'react'
import { Common } from 'components'
import { Row, Col, Card } from 'antd'
import styles from './style.less'
const { LeftCard } = Common
class Assortment extends PureComponent {
  componentWillMount() {}

  render(){
    const leftProps = {
      zhTitle: '历史账户余额',
      title: 'Historical account balance',
      DropdownProps: {
        key: 'days',
        getData(key) {
          console.log(key)
        },
      },
    }
    return (
      <Row type="flex" className='contentInner'>
        <LeftCard {...leftProps}>
          <div>hahahaha</div>
        </LeftCard>
        <Col lg={8} md={24} className='right-row'>
          <Card title={<h2>账户余额</h2>} />
          <Card title={<h2>各个种类累积交易次数</h2>} />
        </Col>
      </Row>
    )
  }
}
export default Assortment