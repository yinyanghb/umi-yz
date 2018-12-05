import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { withI18n } from '@lingui/react'
// import { pathMatchRegexp, queryAncestors } from 'utils'
import styles from './Bread.less'

@withI18n()
@withRouter

class Bread extends PureComponent {
  // generateBreadcrumbs = paths => {}
  render(){
    const obj = [
      '我的账户  ACCOUNT',
      '团队  OURTEAM',
      '行情  QUOTATIONS',
      '新闻  NEWS',
      '研报  REPORT'
    ]
    return (
      <Breadcrumb className={styles.bread}>
        <Breadcrumb.Item >
          {obj[this.props.content-1]}
        </Breadcrumb.Item>
    </Breadcrumb>
    )
  }
}
Bread.propTypes = {
  content: PropTypes.number,
}

export default Bread