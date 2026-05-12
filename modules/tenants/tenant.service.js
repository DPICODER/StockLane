const { generateSlug } = require("../../core/utils/generate-Tenant-Slug");
const tenant = require("./tenant.model");

exports.createTenant = (company, plan, options = {}) => {
    const normalizedPaln = plan || "free";
    return tenant.create({
        slug : generateSlug(company),
        name: company,
        plan: normalizedPaln,
        status: normalizedPaln == "free" ? "trial" : "active"
    }, options);
}

