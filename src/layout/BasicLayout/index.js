import React from 'react';
import getMenuData from 'common/menu';
import style from './index.less';

const Menu = () => {
  const menuList = getMenuData();
  return (
    <ul>
      {menuList.map(item => (
        <li key={item.key}>
          <a href={item.link}>{item.text}</a>
        </li>
      ))}
    </ul>
  );
};

class BasicLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={style.page}>
        <div className={style.menu}>
          <Menu />
        </div>
        <div className={style.content}>{children}</div>
      </div>
    );
  }
}

export default BasicLayout;
