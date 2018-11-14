import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import BaseLayout from './BaseLayout'
import styles from './index.less'

@withRouter
class Layout extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <BaseLayout>{this.props.children}</BaseLayout>
      </div>
    )
  }
}

export default Layout
