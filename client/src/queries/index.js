import { gql } from 'apollo-boost'

export const GET_ARTISTS = gql`
  {
    artists {
      id
      firstName
      lastName
      instruments {
        id
        year
        brand
        type
        price
      }
    }
  }
`

export const GET_ARTIST = gql`
  query Artist($id: String!) {
    artist(id: $id) {
      id
      firstName
      lastName
      instruments {
        id
        year
        brand
        type
        price
      }
    }
  }
`

export const ADD_ARTIST = gql`
  mutation AddArtist($id: String!, $firstName: String!, $lastName: String!) {
    addArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist(
    $id: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_ARTIST = gql`
  mutation RemoveArtist($id: String!) {
    removeArtist(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const ADD_INSTRUMENT = gql`
  mutation AddArtist($id: String!, $year: String!, $brand: String!, $type: String!, $price: String!, $artistId: String!) {
    addInstrument(id: $id, year: $year, brand: $brand, type: $type, price: $price, artistId: $artistId) {
      id
      year
      brand
      type
      price
      artistId
    }
  }
`

export const UPDATE_INSTRUMENT = gql`
  mutation UpdateInstrument($id: String!, $year: String!, $brand: String!, $type: String!, $price: String!, $artistId: String!) {
    updateInstrument(id: $id, year: $year, brand: $brand, type: $type, price: $price, artistId: $artistId) {
      id
      year
      brand
      type
      price
      artistId
    }
  }
`

export const REMOVE_INSTRUMENT = gql`
  mutation RemoveInstrument($id: String!) {
    removeInstrument(id: $id) {
      id
      year
      brand
      type
      price
      artistId
    }
  }
`