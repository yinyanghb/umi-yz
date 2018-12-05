import { PureComponent } from 'react'
import Navlink from 'umi/navlink'
import { Menu, Icon, Layout, Dropdown, Popover, Badge, List } from 'antd'
import styles from './Header.less'
import  {addLangPrefix} from 'utils'
import withRouter from 'umi/withRouter'
const { SubMenu } = Menu

@withRouter
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }

  render() {
    const menu = (
      <Menu onClick={this.handleClickMenu}>
        <Menu.Item key="SignOut">退出</Menu.Item>
      </Menu>
    )
    const isActive = (match,location) =>{
      if(!match){
        return false
      }
      return match.url === location.pathname
    }
    const { routeList, user } = this.props
    const rightContent = (
      <Dropdown overlay={menu} trigger={['click']}>
        <span className="ant-dropdown-link">
          <span style={{ verticalAlign: 'middle' }}>{user.uname}</span>{' '}
          <Icon
            type="caret-down"
            style={{ fontSize: '12px', verticalAlign: 'middle' }}
          />
          <Icon
            type="user"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          />
        </span>
      </Dropdown>
    )
    return (
      <Layout.Header className={styles.header}>
        <div className={styles.leftContent}>
          <a href="/account/profit">
            <img src="/logo.png" />
          </a>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              lineHeight: '1.4',
              color: '#fff',
              backgroundColor: 'transparent',
            }}
          >
            {routeList.map(_ => (
              <Menu.Item key={_.id}>
                <Navlink to={{
                  pathname:addLangPrefix(_.router) || '#',
                  state: _.id
                }} 
                isActive={isActive}
                >
                  {_.zhName}
                  <span style={{ display: 'block', fontSize: '8px' }}>
                    {_.name}
                  </span>
                </Navlink>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

export default Header
