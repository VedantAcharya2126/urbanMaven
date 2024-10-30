var service = require('./home-page-service');

module.exports = (app) => {

    app.post("/customer/getData", service.getCustomerData);


    app.post("/customer/addUpdateData", service.customerData);


    //app.post("/customer/updateData", service.updateCustomerData);

}