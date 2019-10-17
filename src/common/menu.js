const getMenuData = () => {
  const menuList = [
    {
      key: 'homepage',
      text: '首页',
      link: '#/',
    },
    {
      key: 'user',
      text: '用户信息',
      link: '#/user',
    },
  ];
  return menuList;
};

export default getMenuData;
