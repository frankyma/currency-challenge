module.exports = {
  calculate(req, res) {
    console.log('req', req.body)
    console.log('req received by Controller');
    res.header(200).send({
      msg: 'Calculation success',
      budget: 99
    })
  }
}