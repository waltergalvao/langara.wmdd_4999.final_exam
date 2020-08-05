import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { filter } from 'lodash'
import { GET_ARTISTS, REMOVE_ARTIST } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveArtist = ({ id, firstName, lastName }) => {
  const [removeArtist] = useMutation(REMOVE_ARTIST, {
    update(proxy, { data: { removeArtist } }) {
      const { artists } = proxy.readQuery({ query: GET_ARTISTS })
      proxy.writeQuery({
        query: GET_ARTISTS,
        data: {
          artists: filter(artists, c => {
            return c.id !== removeArtist.id
          })
        }
      })
    }
  })
  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this artist?')
    if (result) {
      removeArtist({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeArtist: {
            __typename: 'Artist',
            id,
            firstName,
            lastName
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

export default RemoveArtist
