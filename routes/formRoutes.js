const mongoose = require('mongoose');
const Forms = mongoose.model('forms');

module.exports = (app) => {

    const error = {
        error: true,
        message: "Internal Server Error"
    }
    app.get(`/api/form`, async (req, res) => {
        let forms = await Forms.find();
        console.log("forms:", forms);
        if (forms) {
            return res.status(200).send(forms);
        } else {
            return res.status(500).send(error);
        }
    });

    app.post(`/api/newform`, async (req, res) => {
        let form = await Forms.create(req.body);
        if (form) {
            return res.status(201).send({
                error: false,
                form
            })
        } else {
            return res.status(500).send(error);
        }
    })

    // app.put(`/api/product/:id`, async (req, res) => {
    //     const { id } = req.params;

    //     let product = await Product.findByIdAndUpdate(id, req.body);

    //     return res.status(202).send({
    //         error: false,
    //         product
    //     })

    // });

    // app.delete(`/api/product/:id`, async (req, res) => {
    //     const { id } = req.params;

    //     let product = await Product.findByIdAndDelete(id);

    //     return res.status(202).send({
    //         error: false,
    //         product
    //     })

    // })

}
