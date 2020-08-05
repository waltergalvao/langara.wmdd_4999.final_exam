import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Input, Button } from 'antd'
import { UPDATE_ARTIST } from '../../queries'

const UpdateArtist = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [updateArtist] = useMutation(UPDATE_ARTIST)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values
    updateArtist({
      variables: {
        id,
        firstName,
        lastName
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateArtist: {
          __typename: 'Artist',
          id,
          firstName,
          lastName
        }
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        props.updateStateVariable('firstName', value)
        setFirstName(value)
        break
      case 'lastName':
        props.updateStateVariable('lastName', value)
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <Form
      form={form}
      name='update-artist-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName
      }}
      size='large'
    >
      <Form.Item
        name='firstName'
        label='First Name'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          placeholder='i.e. John'
          onChange={e => updateStateVariable('firstName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='lastName'
        label='Last Name'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input
          placeholder='i.e. Smith'
          onChange={e => updateStateVariable('lastName', e.target.value)}
        />
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
            Update Artist
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateArtist
