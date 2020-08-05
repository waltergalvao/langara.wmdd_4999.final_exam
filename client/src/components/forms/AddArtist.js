import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_ARTIST, GET_ARTISTS } from '../../queries'

const AddArtist = () => {
  const [id] = useState(uuidv4())
  const [addArtist] = useMutation(ADD_ARTIST)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addArtist({
      variables: {
        id,
        firstName,
        lastName
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addArtist: {
          __typename: 'Artist',
          id,
          firstName,
          lastName
        }
      },
      update: (proxy, { data: { addArtist } }) => {
        const data = proxy.readQuery({ query: GET_ARTISTS })
        proxy.writeQuery({
          query: GET_ARTISTS,
          data: {
            ...data,
            artists: [...data.artists, addArtist]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-artist-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Artist
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddArtist
