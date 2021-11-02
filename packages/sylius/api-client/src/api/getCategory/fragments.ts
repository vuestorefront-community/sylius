export const categoryFragment = `
  id
  code
  name
  position
  slug
  description
  parent {
    id
    name
    slug
  }
  enabled
`;
