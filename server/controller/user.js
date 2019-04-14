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
        name: item.name,
        message: 'Registration success!'
      });
    })
    .catch(err => {
      res.jsonp({
        result: 'KO',
        message: 'Attention, user not saved'
      });
    });
  },

  findByEmail (req, res) {
    console.log(req.body.data.email);
    UserModel.findOne({ email: req.body.data.email })
    .then(user => {
      if (!user) {
        return res.send({
          error: true,
          message: "User not found with id " + req.body.data.email
        });
      }
      res.jsonp({
        error: false,
        name: user.name
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
