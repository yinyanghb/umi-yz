import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
// import NProgress from 'nprogress'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import { Layout } from 'antd'
import { pathMatchRegexp } from 'utils'
import './BaseLayout.less'
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const {  children, location } = this.props
    if(pathMatchRegexp('/login',location.pathname)){
      return (
        children
      )
    }
    return (
     

      <Fragment>
        
        <Helmet>
          <title>{'量化APP'}</title>
        </Helmet>
        {/* <Loader fullScreen spinning={loading.effects['app/query']} /> */}
        <Layout>
          <div>shouye</div>
          <div>{children}</div>
        </Layout>
      </Fragment>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object,
}

export default BaseLayout
