const { generateSlug } = require("../../core/utils/generateSlug");
const tenant = require("./tenant.model");
exports.createTenant = (company, plan, options = {}) => {
    return tenant.create({
        slug : generateSlug(company),
        name: company,
        plan: plan || "free",
        status: plan == "free" ? "trial" : "active"
    }, options);
}


exports.checkTenantExists = (email) =>{
    return tenant.findOne({where:email})
}