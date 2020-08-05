import React, { useEffect, useState } from 'react'
import {useLazyQuery, useMutation} from '@apollo/react-hooks'
import {Form, Input, Button, Select} from 'antd'
import {GET_ARTISTS, UPDATE_INSTRUMENT} from '../../queries'
const { Option } = Select;

const UpdateInstrument = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [brand, setBrand] = useState(props.brand)
  const [type, setType] = useState(props.type)
  const [price, setPrice] = useState(props.price)
  const [artistId, setArtistId] = useState(props.artistId)
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENT)
  const [getArtists, { loading, data }] = useLazyQuery(GET_ARTISTS);

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
    getArtists();
  }, [])

  const onFinish = values => {
    const { brand, type, year, price, artistId } = values
    updateInstrument({
      variables: {
        id,
        brand,
        type,
        year,
        price,
        artistId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateInstrument: {
          __typename: 'Instrument',
          id,
          brand,
          type,
          year,
          price,
          artistId
        }
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        props.updateStateVariable('year', value)
        setYear(value)
        break
      case 'brand':
        props.updateStateVariable('brand', value)
        setBrand(value)
        break
      case 'type':
        props.updateStateVariable('type', value)
        setType(value)
        break
      case 'price':
        props.updateStateVariable('price', value)
        setPrice(value)
        break
      case 'artistId':
        props.updateStateVariable('artistId', value)
        setArtistId(value)
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
        brand,
        type,
        year,
        price,
        artistId
      }}
      size='large'
    >
      <Form.Item
        name='brand'
        label='Brand'
        rules={[{ required: true, message: 'Please input the brand!' }]}
      >
        <Input
          placeholder='i.e. Gibson'
          onChange={e => updateStateVariable('brand', e.target.value)}
        />
      </Form.Item>

      <Form.Item
          name='type'
          label='Brand'
          rules={[{ required: true, message: 'Please input the type!' }]}
      >
        <Input
            placeholder='i.e. John'
            onChange={e => updateStateVariable('firstName', e.target.value)}
        />
      </Form.Item>

      <Form.Item
          name='year'
          label='Brand'
          rules={[{ required: true, message: 'Please input the year!' }]}
      >
        <Input
            placeholder='2012'
            onChange={e => updateStateVariable('year', e.target.value)}
        />
      </Form.Item>

      <Form.Item
          name='price'
          label='Price'
          rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input
            placeholder='$5000'
            onChange={e => updateStateVariable('price', e.target.value)}
        />
      </Form.Item>



      <Form.Item
          name='price'
          label='Price'
          rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input
            hidden
            placeholder='$5000'
            onChange={e => updateStateVariable('price', e.target.value)}
        />
      </Form.Item>

      <Form.Item
          label='Artist'
          name='artistId'
          rules={[{ required: true, message: 'Please input the artist!' }]}
      >
        <Select style={{ width: 120 }} value={artistId} onChange={value => updateStateVariable('artistId', value)}>
          {data && data.artists.map(({ id, firstName, lastName }) => (
              <Option value={id} key={id}>{firstName} {lastName}</Option>
          ))}
        </Select>
      </Form.Item>

      <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
        <Form.Item shouldUpdate={true}>
          {() => (
              <Button
                  type='primary'
                  htmlType='submit'
                  disabled={
                    // !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
              >
                Update Instrument
              </Button>
          )}
        </Form.Item>
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </div>
    </Form>
  )
}

export default UpdateInstrument
