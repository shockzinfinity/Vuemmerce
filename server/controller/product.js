import ProductModel from '../models/product';

//Create new Product
export default {

  create (req, res) {

    // Request validation
    if (!req.body) {
      return res.status(400).send({
        dmessage: 'Product content can not be empty'
      });
    }

    // Create a Product
    let model = new ProductModel(req.body);
    model.save()
    .then(item => {
      res.jsonp({ message: 'Product saved' });
    })
    .catch(err => {
      res.jsonp({
        result: 'KO',
        message: 'Attention, product not saved'
      });
    });
  },

  findAll (req, res) {
    ProductModel.find()
    .then(products => {
      res.send(products);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
  },

  /* findOne (req, res) {
    ProductModel.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.productId
        });
    });
  },

  update (req, res) {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    ProductModel.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.productId
        });
    }); */
 // },

  /* delete (req, res) {
    ProductModel.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    }); */
  //}

};
