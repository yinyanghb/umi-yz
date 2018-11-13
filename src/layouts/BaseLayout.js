import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import NProgress from 'nprogress'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import './BaseLayout.less'
import { render } from 'preact';
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class BaseLayout extends PureComponent{
    previousPath = ''

    render(){
        const {loading,children,location}=this.props
        return(
            <Fragment>
            <Helmet>
              <title>{'yz'}</title>
            </Helmet>
            {/* <Loader fullScreen spinning={loading.effects['app/query']} /> */}
            <div>{children}</div>
          </Fragment>
        )
    }
}

BaseLayout.propTypes = {
    loading: PropTypes.object,
  }


export default BaseLayout