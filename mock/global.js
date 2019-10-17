import mockjs from 'mockjs';

const proxy = {
  'GET /api/config': (req, res) => {
    res.send(
      mockjs.mock({
        'version|1-10': 1,
      })
    );
  },
};

export default proxy;
