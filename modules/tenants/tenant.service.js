const { generateSlug } = require("../../core/utils/generate-Tenant-Slug");
const tenant = require("./tenant.model");

exports.createTenant = (company, plan, options = {}) => {
    const normalizedPlan = plan || "free";
    return tenant.create({
        slug : generateSlug(company),
        name: company,
        plan: normalizedPlan,
        status: normalizedPlan == "free" ? "trial" : "active"
    }, options);
}

