import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
const menuobj = {

};

const Spinner = ({ selectedKeys='days', getData ,selects = [
  {key:'days',val:'最近7日',},
  {key:'weeks',val:'近4个月'},
  {key:'quarter',val:'4个季度'}
]}) => {
  const hanldClick = key => {
    getData(key.key);
  };
  const select = (
    <Menu onClick={hanldClick}>
      {selects.map(item=>{
        menuobj[item.key] = item.val
        return (
          <Menu.Item key={item.key}>{item.val}</Menu.Item>
        )
      })}
    </Menu>
  );

  return (
  
    <Dropdown overlay={select} trigger={['click']}>
    
      <span className="">
        <span
          style={{ color: '#fff', verticalAlign: 'middle', fontSize: '11px' }}
        >
          {menuobj[selectedKeys]}
        </span>{' '}
        <Icon
          type="caret-down"
          style={{ color: '#fff', fontSize: '12px', verticalAlign: 'middle' }}
        />
      </span>
    </Dropdown>
  );
};

Spinner.propTypes = {
  selectedKeys: PropTypes.string,
  getData: PropTypes.func
};

export default Spinner;
