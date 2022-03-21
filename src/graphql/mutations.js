/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createPriceBuild = /* GraphQL */ `
  mutation CreatePriceBuild(
    $input: CreatePriceBuildInput!
    $condition: ModelPriceBuildConditionInput
  ) {
    createPriceBuild(input: $input, condition: $condition) {
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
export const updatePriceBuild = /* GraphQL */ `
  mutation UpdatePriceBuild(
    $input: UpdatePriceBuildInput!
    $condition: ModelPriceBuildConditionInput
  ) {
    updatePriceBuild(input: $input, condition: $condition) {
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
export const deletePriceBuild = /* GraphQL */ `
  mutation DeletePriceBuild(
    $input: DeletePriceBuildInput!
    $condition: ModelPriceBuildConditionInput
  ) {
    deletePriceBuild(input: $input, condition: $condition) {
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
export const createProductCategory = /* GraphQL */ `
  mutation CreateProductCategory(
    $input: CreateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    createProductCategory(input: $input, condition: $condition) {
      id
      name
      userid
      createdAt
      updatedAt
    }
  }
`;
export const updateProductCategory = /* GraphQL */ `
  mutation UpdateProductCategory(
    $input: UpdateProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    updateProductCategory(input: $input, condition: $condition) {
      id
      name
      userid
      createdAt
      updatedAt
    }
  }
`;
export const deleteProductCategory = /* GraphQL */ `
  mutation DeleteProductCategory(
    $input: DeleteProductCategoryInput!
    $condition: ModelProductCategoryConditionInput
  ) {
    deleteProductCategory(input: $input, condition: $condition) {
      id
      name
      userid
      createdAt
      updatedAt
    }
  }
`;
