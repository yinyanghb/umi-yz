/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep, } from 'lodash'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout, Drawer } from 'antd'
import { config, pathMatchRegexp, langFromPath } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'

const { Content } = Layout
const { Header ,Bread ,Sider} = MyLayout
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  render() {
    const { app, location, dispatch, children, } = this.props
    const { user, routeList } = app

    const headerProps = {
      routeList,user,onSignOut(){
        dispatch({ type: 'app/signOut' })
      }
    }
    const siderMenu = routeList[(location.state-1||0)].children
    const siderProps = {
      menus :siderMenu,
      hanldSelect(key){
        
        const [id,router] = key.split(',')
        routeList[id.charAt(0)-1].router=router
        dispatch({type:'app/updateState',routeList})
        
      }
    }
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
      _ => _.router && pathMatchRegexp(_.router, location.pathname)
    )
    const BreadProps = {
      content : location.state 
    }
    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? [1, 2, 3, 4, 5].includes(currentRoute.id)
      : false

    return (
      <Fragment>
        <Layout className={styles.container}>
          <Header {...headerProps} />
          <Bread {...BreadProps} />
          <Layout className={styles.layout}>
            <Sider {...siderProps} /> 
            <Content className={styles.content}>
            {/* {hasPermission ? children : <Error />} */}
            {children}
          </Content>
          </Layout>
        
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
