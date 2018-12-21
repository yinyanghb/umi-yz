import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import {LineCharts} from 'chart'
import styles from './historical.less'

class Historical extends React.PureComponent{
   render(){
     const {loading,data} = this.props
     return (
       <Spin spinning={loading}>
        <div className = {styles.chart} >
          <LineCharts data = {data} />
        </div>
       </Spin>
     )
   }
}
Historical.propTypes = {
  loading: PropTypes.bool,
}

export default Historical