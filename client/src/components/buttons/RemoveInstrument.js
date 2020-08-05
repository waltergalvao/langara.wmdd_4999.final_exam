import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { filter } from 'lodash'
import { GET_ARTISTS, REMOVE_INSTRUMENT } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'
import Instrument from "../listItems/Instrument";

const RemoveInstrument = ({id, year, brand, type, price, artistId}) => {
  const [removeInstrument] = useMutation(REMOVE_INSTRUMENT, {
    update(proxy, { data: { removeInstrument } }) {
      const { artists } = proxy.readQuery({ query: GET_ARTISTS })
      proxy.writeQuery({
        query: GET_ARTISTS,
        data: {
          artists: artists.map(artist => {
            if (artist.id !== removeInstrument.artistId) {
              return artist;
            }

            return {
              ...artist,
              instruments: artist.instruments.filter(intrument => {
                return intrument.id !== removeInstrument.id;
              })
            }
          })
        }
      })
    }
  })
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this instrument?')
    if (result) {
      removeInstrument({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeInstrument: {
            __typename: 'Instrument',
            id,
            year,
            brand,
            type,
            price,
            artistId
          }
        }
      })
    }
  }
  return (
    <DeleteOutlined
      key='delete'
      onClick={handleButtonClick}
      style={{ color: 'red' }}
    />
  )
}

export default RemoveInstrument
