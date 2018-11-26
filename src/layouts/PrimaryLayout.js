/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout, Drawer } from 'antd'
import { config, pathMatchRegexp, langFromPath } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'

const { Content } = Layout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  render() {
    const { app, location, dispathc, children } = this.props
    const { user,routeList } = app
    // Localized route name.
    const newRouteList =
      langFromPath(location.pathname) === 'zh'
        ? routeList.map(item => {
            const { zhName, ...other } = item
            return {
              ...other,
              name: zhName,
            }
          })
        : routeList
    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )
     
    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? [1,2,3,4,5].includes(currentRoute.id)
      : false

    return (
      <Fragment>
        <Layout>
            <Content className={styles.content}>
              {hasPermission ? children : <Error />}
              
            </Content>
        </Layout>
      </Fragment>
    )
  }
}


PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout