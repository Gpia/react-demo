import mockjs from 'mockjs';

const proxy = {
  'GET /api/userInfo': (req, res) => {
    res.send(
      mockjs.mock({
        user: '@cname',
        id: '@id',
        info: '@title(1, 3)',
      })
    );
  },
};

export default proxy;
