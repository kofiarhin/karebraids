// fallow-ignore-file unused-file -- Jest discovers this test by convention.
const {
  FUTURE_PRODUCT_CATALOG,
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  PRODUCT_TYPES,
} = require('../constants/products');

describe('future product catalogue scaffold', () => {
  it('defines the requested future sales categories without publishing products', () => {
    expect(PRODUCT_CATEGORIES).toEqual({
      HAIR_EXTENSIONS: 'hair-extension',
      HAIR_PRODUCTS: 'hair-product',
    });
    expect(PRODUCT_TYPES).toEqual(expect.objectContaining({
      BRAIDING_HAIR: 'braiding-hair',
      EXTENSION_BUNDLE: 'extension-bundle',
      OIL: 'oil',
      HAIR_CARE: 'hair-care',
    }));
    expect(PRODUCT_STATUSES).toEqual({ DRAFT: 'draft', ARCHIVED: 'archived' });
    expect(FUTURE_PRODUCT_CATALOG).toEqual([]);
    expect(Object.isFrozen(PRODUCT_CATEGORIES)).toBe(true);
    expect(Object.isFrozen(PRODUCT_TYPES)).toBe(true);
    expect(Object.isFrozen(PRODUCT_STATUSES)).toBe(true);
    expect(Object.isFrozen(FUTURE_PRODUCT_CATALOG)).toBe(true);
  });
});
