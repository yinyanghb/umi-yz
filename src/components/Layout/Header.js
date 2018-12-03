import { PureComponent ,Fragment} from 'react'
import Navlink from 'umi/navlink'
import { Menu, Icon, Layout, Avatar, Popover, Badge, List } from 'antd'
import styles from './Header.less'
const { SubMenu } = Menu
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }

  render(){
  
   
    const  { routeList , user } = this.props
    const rightContent = (
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span >
                Hi,
              </span>
              <span>{user.uname}</span>
              <Icon type="caret-down" style={{ fontSize: '12px', verticalAlign: 'middle' }} /> 
              <Icon type="user" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
            </Fragment>
          }
        >
            <Menu.Item key="SignOut">
              Sign out
            </Menu.Item>
        </SubMenu>
      </Menu>
    )
    return (
      <Layout.Header className={styles.header}>
        <div className={styles.leftContent}>
          <a href='/account/profit' > 
            <img src="/logo.png" />
          </a>
          <Menu
            	theme="dark"
              mode="horizontal"
              style={{lineHeight: '1.4',color:'#fff', backgroundColor: 'transparent' }}
          >
            {routeList.map(_=>(
              <Menu.Item key={_.id}>
                <Navlink to={_.router|| '#'}>
                { _.zhName}
                <span style={{display: 'block', fontSize: '8px'}}>{_.name}</span>
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


