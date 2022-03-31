export const productFragment = `
  id
  _id
  sku: code
  name
  slug
  averageRating
  shortDescription
  description
  metaKeywords
  metaDescription
  productTaxons {
    edges {
      node {
        taxon {
          id
        }
      }
    }
  }
  options {
    edges {
      node {
        id
        _id
        values {
          edges {
            node {
              id
              code
              value
            }
          }
        }
        name
        code
      }
    }
  }
  variants {
    collection {
      id
      code
      name
      inStock
      onHold
      onHand
      channelPricings {
        collection {
          channelCode
          price
        }
      }
      optionValues {
        edges {
          node {
            id
            code
            value
            option {
              id
            }
          }
        }
      }
    }
  }
  attributes {
    edges {
      node {
        type
        stringValue
        name
        localeCode
      }
    }
  }
  imagesRef: images {
    collection {
      path
    }
  }
  enabled
`;
