import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import styles from './index.less';

@withRouter
// function BasicLayout(props) {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to umi!</h1>
//       {props.children}
//     </div>
//   );
// }
class Layout extends Component{
  render(){
    return (
    <div className={styles.normal}>
    
      {this.props.children}
    </div>
    )
  }
}

export default Layout