import bodyParser from 'body-parser';
import ProductController from '../controller/product';
import UserModel from '../models/user';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/users' , (req, res) => {
    UserModel.find({} , (err, users) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(users)
      }
    })
  });

  app.post('/users', (req, res) => {
    let model = new UserModel(req.body)
    model.save()
    res.status(201).send(model)
  });

  app.get('/' , (req, res) => {
    ProductController.findAll(req, res);
  });

/*   app.post('/products', (req, res) => {
    let model = new ProductModel(req.body)
    model.save()
    res.status(201).send(model)
  }); */

  app.post('/save_product', (req, res) => {
    ProductController.create(req, res);
  });
}
