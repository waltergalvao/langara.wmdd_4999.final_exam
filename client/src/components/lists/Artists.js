import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ARTISTS } from '../../queries'

import { List } from 'antd'

import Artist from '../listItems/Artist'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Artists = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.artists.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Artist key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default Artists
