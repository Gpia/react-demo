import React from 'react';
import style from './index.less';

const Page = props => {
  const { title, children } = props;
  return (
    <div className={style.page}>
      <p>当前页面：{title}</p>
      {children}
    </div>
  );
};

export default Page;
