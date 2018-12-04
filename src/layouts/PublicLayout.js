import React from 'react' ;
import styles from './PublicLayout.less'

export default ({ children }) => {
  return <div className = {styles.LoginWrapper}>{ children}</div>  
}
