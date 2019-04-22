import UserModel from '../models/User';

export default {

  create (req, res) {

    // Request validation
    if (!req.body) {
      return res.status(400).send({
        dmessage: 'User data can not be empty'
      });
    }

    // Create a Product
    let model = new UserModel(req.body);
    model.save()
    .then(item => {
      res.jsonp({
        error: false,
        name: item.name,
        message: 'Registration success!'
      });
    })
    .catch(err => {
      res.jsonp({
        error: true,
        message: 'Attention, user not saved'
      });
    });
  },

  findByEmail (req, res) {
    UserModel.findOne({ email: req.body.data.email, password: req.body.data.password })
    .then(user => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found with id " + req.body.data.email
        });
      }
      res.jsonp({
        error: false,
        name: user.name,
        role: user.role
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          error: true,
          message: "User not found with id " + req.body.data.email
        });
      }
      return res.status(500).send({
        error: true,
        message: "Something wrong retrieving User with id " + req.body.data.email
      });
    });

  }

}
