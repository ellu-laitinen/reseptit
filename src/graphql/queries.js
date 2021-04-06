/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBreakfast = /* GraphQL */ `
  query GetBreakfast($id: ID!) {
    getBreakfast(id: $id) {
      id
      title
      ingredients
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const listBreakfasts = /* GraphQL */ `
  query ListBreakfasts(
    $filter: ModelBreakfastFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBreakfasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        ingredients
        instructions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLunch = /* GraphQL */ `
  query GetLunch($id: ID!) {
    getLunch(id: $id) {
      id
      title
      ingredients
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const listLunchs = /* GraphQL */ `
  query ListLunchs(
    $filter: ModelLunchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLunchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        ingredients
        instructions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSnack = /* GraphQL */ `
  query GetSnack($id: ID!) {
    getSnack(id: $id) {
      id
      title
      ingredients
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const listSnacks = /* GraphQL */ `
  query ListSnacks(
    $filter: ModelSnackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSnacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        ingredients
        instructions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDinner = /* GraphQL */ `
  query GetDinner($id: ID!) {
    getDinner(id: $id) {
      id
      title
      ingredients
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const listDinners = /* GraphQL */ `
  query ListDinners(
    $filter: ModelDinnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDinners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        ingredients
        instructions
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
