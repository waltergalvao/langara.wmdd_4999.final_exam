import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateArtist from '../forms/UpdateArtist'
import RemoveArtist from '../buttons/RemoveArtist'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Artist = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()

  const fullName = () => {
    return `${props.firstName} ${props.lastName}`
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdateArtist
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveArtist id={id} firstName={firstName} lastName={lastName} />
          ]}
          style={styles.card}
        >
          {fullName()}
        </Card>
      )}
    </List.Item>
  )
}

export default Artist
