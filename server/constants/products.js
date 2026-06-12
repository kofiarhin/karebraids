// fallow-ignore-file unused-file -- intentionally dormant until ecommerce is approved.
const PRODUCT_CATEGORIES = Object.freeze({
  HAIR_EXTENSIONS: 'hair-extension',
  HAIR_PRODUCTS: 'hair-product',
});

const PRODUCT_TYPES = Object.freeze({
  BRAIDING_HAIR: 'braiding-hair',
  EXTENSION_BUNDLE: 'extension-bundle',
  OIL: 'oil',
  HAIR_CARE: 'hair-care',
});

const PRODUCT_STATUSES = Object.freeze({
  DRAFT: 'draft',
  ARCHIVED: 'archived',
});

// TODO(ecommerce): Add owner-approved product records only after catalogue,
// inventory, fulfilment, tax, payment, and admin requirements are specified.
// This intentionally has no route, controller, model, checkout, or public UI.
const FUTURE_PRODUCT_CATALOG = Object.freeze([]);

module.exports = {
  // fallow-ignore-next-line unused-export -- reserved for the future catalogue boundary.
  FUTURE_PRODUCT_CATALOG,
  // fallow-ignore-next-line unused-export -- reserved for the future catalogue boundary.
  PRODUCT_CATEGORIES,
  // fallow-ignore-next-line unused-export -- reserved for the future catalogue boundary.
  PRODUCT_STATUSES,
  // fallow-ignore-next-line unused-export -- reserved for the future catalogue boundary.
  PRODUCT_TYPES,
};
