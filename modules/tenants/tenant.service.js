const tenant = require("./tenant.model");

exports.createTenant = (company, plan, options = {}) => {
    return tenant.create({
        name: company,
        plan: plan || "free"
    }, options);
}