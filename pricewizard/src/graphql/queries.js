/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPriceBuild = /* GraphQL */ `
  query GetPriceBuild($id: ID!) {
    getPriceBuild(id: $id) {
      id
      category {
        id
        name
        userid
        createdAt
        updatedAt
      }
      compacquisition
      comprelacement
      compsegment
      compshrink
      packaging
      finishedshrink
      interplantfreight
      manufacturingcost
      externalconsulting
      servicevalue
      nonstandard
      discountpremium
      inflationpremium
      curriskpremium
      cashpremium
      taxpremium
      marketfreight
      createdAt
      updatedAt
      priceBuildCategoryId
    }
  }
`;
export const listPriceBuilds = /* GraphQL */ `
  query ListPriceBuilds(
    $filter: ModelPriceBuildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPriceBuilds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category {
          id
          name
          userid
          createdAt
          updatedAt
        }
        compacquisition
        comprelacement
        compsegment
        compshrink
        packaging
        finishedshrink
        interplantfreight
        manufacturingcost
        externalconsulting
        servicevalue
        nonstandard
        discountpremium
        inflationpremium
        curriskpremium
        cashpremium
        taxpremium
        marketfreight
        createdAt
        updatedAt
        priceBuildCategoryId
      }
      nextToken
    }
  }
`;
export const getProductCategory = /* GraphQL */ `
  query GetProductCategory($id: ID!) {
    getProductCategory(id: $id) {
      id
      name
      userid
      createdAt
      updatedAt
    }
  }
`;
export const listProductCategories = /* GraphQL */ `
  query ListProductCategories(
    $filter: ModelProductCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        userid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
