import React, { PureComponent } from 'react'
import { Common } from 'components'
import { Row, Col, Card, Spin ,Icon } from 'antd'
import  {DATA} from 'utils'
import styles from './style.less'
import Historical from './components/historical'
const { LeftCard } = Common
// const {up} = DATA
import { connect } from 'dva'
const {UpIcon} = DATA
@connect(({ profit, loading }) => ({
  profit,
  loading,
}))
class Profit extends PureComponent {
  componentWillMount() {}

  render() {
    const { loading, profit, dispatch } = this.props
    const {
      HistoryInfoData,
      trderInfo,
      selectedKeys,
      realAmount,
      realNetValue,
      realAmountDiffer,
      initInvestAmount,
      realNetValueDiffer,
    } = profit
    // console.log(this.props)
    const leftProps = {
      zhTitle: '历史账户余额',
      title: 'Historical account balance',
      DropdownProps: {
        selectedKeys,
        getData(key) {
          dispatch({
            type: 'profit/updateState',
            payload: { selectedKeys: key },
          })
          dispatch({ type: 'profit/history' })
        },
      },
    }

    return (
      <Row type="flex" className="contentInner">
        <LeftCard {...leftProps}>
          <Historical
            loading={loading.effects['profit/history']}
            data={HistoryInfoData}
          />
        </LeftCard>
        <Col lg={8} md={24} className="right-row">
          <Card
            title={
              <>
                <h2>账户一览</h2>
                <p>Account details</p>
              </>
            }
          >
            <Row className="mt20">
              <Col span={14}>
                <div className="mb20 text-right fz22">{realAmount}</div>
                <div className="mb20 text-right fz18">{realNetValue}</div>
                <div className="mb20 text-right fz16">{initInvestAmount}</div>
              </Col>
              <Col span={10}>
                <Row
                  className="mb20"
                  type="flex"
                  justify="space-between"
                  align="middle"
                >
                  <Col span={5}>
                    <i className="icon-rise-large vm mr5" />
                  </Col>
                  <Col span={19}>
                    <span className="vm fz22">&nbsp;</span>
                    <span className="vm">账户余额</span>
                  </Col>
                </Row>
                <Row
                  className="mb20"
                  type="flex"
                  justify="space-between"
                  align="middle"
                >
                  <Col span={5}>
                  </Col>
                  <Col span={19}>
                    <span className="vm fz18">&nbsp;</span>
                    <span className="vm">实时净值</span>
                  </Col>
                </Row>
                <Row
                  className="mb20"
                  type="flex"
                  justify="space-between"
                  align="middle"
                >
                  <Col span={5} />
                  <Col span={19}>
                    <span className="vm fz14">&nbsp;</span>初始投资额
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card title={<><h2>各个种类累积交易次数</h2><p>Accumulated trading times</p></>} />
        </Col>
      </Row>
    )
  }
}

export default Profit
