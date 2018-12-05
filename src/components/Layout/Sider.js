import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Navlink from 'umi/navlink'
import { Icon, Menu, Layout } from 'antd'
import  {addLangPrefix,DATA} from 'utils'
import { withI18n, Trans } from '@lingui/react'
import styles from './Sider.less'
import withRouter from 'umi/withRouter'

@withRouter
@withI18n()
class Sider extends PureComponent {
  hanldSelect=(key,k)=>{
   
   this.props.hanldSelect(key.key,)
  }
  render(){
    const {
      i18n,
      menus,
      location
    }=this.props
    return (
     <Layout.Sider
      width={80}
      style={{
         backgroundColor:' rgb(14, 28, 44)'
      }}
     >
      <Menu
       className={styles.sidermenu}
       onSelect={this.hanldSelect}
      >
        {menus&&menus.map(item=>(
          <Menu.Item
            key={item.id+','+item.router}
          >
            <Navlink to={{
              pathname:addLangPrefix(item.router) || '#',
              state: item.state
            }}
            isActive={(match,location)=>{
              if(!match){
                return false
              }
              return match.url === location.pathname
            }}
            >
              <img src={DATA[item.icon]} alt="" className='sider-icon'/>
              <span className="sidenav-text">{item.name}</span>
            </Navlink>
          </Menu.Item>
        ))}
      </Menu>
     </Layout.Sider>
    )
  }
 
}
export default Sider