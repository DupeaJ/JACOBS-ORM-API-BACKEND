// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});
// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    as: "tags",
    foreignKey: "productId",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    as: "products",
    foreignKey: "tagId",
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
