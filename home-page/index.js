var service = require('./home-page-service');

module.exports = (app) => {

    app.post("/homepage/bookService", service.bookService);


    //app.post("/customer/updateData", service.updateCustomerData);

}