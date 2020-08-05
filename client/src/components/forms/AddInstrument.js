import React, {useEffect, useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Button, Form, Input, Select} from 'antd'
import {v4 as uuidv4} from 'uuid'
import {ADD_INSTRUMENT, GET_ARTISTS} from '../../queries'
import {useLazyQuery} from "@apollo/client";

const { Option } = Select;
const AddInstrument = () => {
  const [id] = useState(uuidv4())
  const [addInstrument] = useMutation(ADD_INSTRUMENT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [getArtists, { loading, data }] = useLazyQuery(GET_ARTISTS);

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
    getArtists();
  }, [])

  const onFinish = values => {
    const { year, brand, type, price, artistId } = values

    addInstrument({
      variables: {
        id,
        year,
        brand,
        type,
        price,
        artistId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addInstrument: {
          __typename: 'Instrument',
          id,
          year,
          brand,
          type,
          price,
          artistId
        }
      },
      update: (proxy, { data: { addInstrument } }) => {
        const data = proxy.readQuery({ query: GET_ARTISTS })
        proxy.writeQuery({
          query: GET_ARTISTS,
          data: {
            ...data,
            artists: data.artists.map(artist => {
              if (artist.id !== addInstrument.artistId) {
                return artist;
              }

              return {
                ...artist,
                instruments: [
                    ...artist.instruments,
                    addInstrument,
                ]
              }
            })
          }
        })
      }
    })
  }

  if (!data) {
    return null;
  }

  return (
    <Form
      form={form}
      name='add-instrument-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the year!' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item
        name='brand'
        rules={[{ required: true, message: 'Please input the brand!' }]}
      >
        <Input placeholder='Brand' />
      </Form.Item>

      <Form.Item
          name='type'
          rules={[{ required: true, message: 'Please input the type!' }]}
      >
        <Input placeholder='Type' />
      </Form.Item>

      <Form.Item
          name='price'
          rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input placeholder='Price' />
      </Form.Item>

      <Form.Item
          name='artistId'
          rules={[{ required: true, message: 'Please input the artist!' }]}
      >
        <Select style={{ width: 120 }}>
          {data && data.artists.map(({ id, firstName, lastName }) => (
              <Option value={id} key={id}>{firstName} {lastName}</Option>
          ))}
        </Select>
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
            Add Instrument
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddInstrument
