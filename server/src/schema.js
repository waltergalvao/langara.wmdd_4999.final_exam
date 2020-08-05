import { gql } from 'apollo-server-express'
import { filter, find, remove } from 'lodash'

const artists = [
  {
    id: '1',
    firstName: 'Eric',
    lastName: 'Clapton'
  },
  {
    id: '2',
    firstName: 'Elton',
    lastName: 'John'
  },
  {
    id: '3',
    firstName: 'Paul',
    lastName: 'McCartney'
  }
]

const instruments = [
  {
    id: '1',
    year: '2019',
    brand: 'Yamaha',
    type: 'Acoustic Guitar',
    price: '4000',
    artistId: '1'
  },
  {
    id: '2',
    year: '2018',
    brand: 'Fender',
    type: 'Electric Guitar',
    price: '1300',
    artistId: '1'
  },
  {
    id: '3',
    year: '2017',
    brand: 'Martin',
    type: 'Acoustic Guitar',
    price: '5000',
    artistId: '1'
  },
  {
    id: '4',
    year: '2019',
    brand: 'Yamaha',
    type: 'Grand Piano',
    price: '13000',
    artistId: '2'
  },
  {
    id: '5',
    year: '2018',
    brand: 'Steinway & Sons',
    type: 'Concert Piano',
    price: '70000',
    artistId: '2'
  },
  {
    id: '6',
    year: '2017',
    brand: 'Fazioli',
    type: 'Concert Piano',
    price: '150000',
    artistId: '2'
  },
  {
    id: '7',
    year: '2019',
    brand: 'Martin',
    type: 'Acoustic Guitar',
    price: '1400',
    artistId: '3'
  },
  {
    id: '8',
    year: '2018',
    brand: 'Kawai',
    type: 'Upright Piano',
    price: '2000',
    artistId: '3'
  },
  {
    id: '9',
    year: '2017',
    brand: 'Roland',
    type: 'Keyboard',
    price: '1200',
    artistId: '3'
  }
]

const typeDefs = gql`
  type Artist {
    id: String!
    firstName: String!
    lastName: String!
    instruments: [Instrument]
  }
  
  type Instrument {
    id: String!
    year: String!
    brand: String!
    type: String!
    price: String!
    artistId: String!
  }

  type Query {
    artists: [Artist]
    artist(id: String!): Artist
  }

  type Mutation {
    addArtist(id: String!, firstName: String!, lastName: String!): Artist
    updateArtist(id: String!, firstName: String!, lastName: String!): Artist
    removeArtist(id: String!): Artist

    addInstrument(id: String!, year: String!, brand: String!, type: String!, price: String!, artistId: String!): Instrument
    updateInstrument(id: String!, year: String!, brand: String!, type: String!, price: String!, artistId: String!): Instrument
    removeInstrument(id: String!): Instrument
  }
`

const resolvers = {
  Query: {
    artists: () => artists.map(artist => {
      return {
        ...artist,
        instruments: instruments.filter(instrument => instrument.artistId === artist.id)
      }
    }),
    artist: (root, args) => {
      const artist = find(artists, { id: args.id })

      if (!artist) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }

      return {
        ...artist,
        instruments: instruments.filter(instrument => instrument.artistId === artist.id)
      }
    }
  },
  Mutation: {
    addArtist: (root, args) => {
      const newArtist = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
        instruments: [],
      }
      artists.push(newArtist)
      return newArtist
    },
    updateArtist: (root, args) => {
      const artist = find(artists, { id: args.id })
      if (!artist) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }

      artist.firstName = args.firstName
      artist.lastName = args.lastName
      return artist
    },
    removeArtist: (root, args) => {
      const removedArtist = find(artists, { id: args.id });

      if (!removedArtist) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }
      remove(artists, a => {
        return a.id === removedArtist.id
      });

      remove(instruments, a => {
        a.artistId === removedArtist.id
      });

      return removedArtist
    },
    /*
    addInstrument(id: String!, year: String!, brand: String!, type: String!, price: String!, artistId: String!): Instrument
    updateInstrument(id: String!, year: String!, brand: String!, type: String!, price: String!, artistId: String!): Instrument
    removeInstrument(id: String!): Instrument
     */

    addInstrument: (root, args) => {
      const newInstrument = {
        id: args.id,
        year: args.year,
        brand: args.brand,
        type: args.type,
        price: args.price,
        artistId: args.artistId,
      }
      instruments.push(newInstrument);
      return newInstrument
    },
    updateInstrument: (root, args) => {
      const instrument = find(instruments, { id: args.id })
      if (!instrument) {
        throw new Error(`Couldn't find instrument with id ${args.id}`)
      }

      instrument.year = args.year;
      instrument.brand = args.brand;
      instrument.type = args.type;
      instrument.price = args.price;
      instrument.artistId = args.artistId;
      return instrument
    },
    removeInstrument: (root, args) => {
      const removedInstrument = find(instruments, { id: args.id })
      if (!removedInstrument) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }
      remove(instruments, a => {
        return a.id === removedInstrument.id
      })
      return removedInstrument
    },
  }
}
export { typeDefs, resolvers }
