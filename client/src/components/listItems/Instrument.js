import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import RemoveArtist from "../buttons/RemoveArtist";
import RemoveInstrument from "../buttons/RemoveInstrument";
import UpdateArtist from "../forms/UpdateArtist";
import UpdateInstrument from "../forms/UpdateInstrument";

const getStyles = () => ({
    card: {
        width: '100%'
    }
})

const Instrument = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [brand, setBrand] = useState(props.brand)
    const [type, setType] = useState(props.type)
    const [price, setPrice] = useState(props.price)
    const [artistId, setArtistId] = useState(props.artistId)
    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'brand':
                setBrand(value)
                break
            case 'type':
                setType(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'artistId':
                setArtistId(value)
                break
            default:
                break
        }
    }

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <List.Item key={props.id}>
            {editMode ? (
                <Card style={styles.card}>
                    <UpdateInstrument
                        id={id}
                        year={year}
                        brand={brand}
                        type={type}
                        price={price}
                        artistId={artistId}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                    />
                </Card>
            ) : (
                <Card
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveInstrument id={id} year={year} brand={brand} type={type} price={price} artistId={artistId} />
                    ]}
                    style={styles.card}
                >
                    <p><strong>Brand:</strong> {brand}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Year:</strong> {year}</p>
                    <p><strong>Price:</strong> {price}</p>
                </Card>
            )}
        </List.Item>
    )
}

export default Instrument
