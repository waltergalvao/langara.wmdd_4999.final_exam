import React from 'react'
import {
    useParams,
    Link
} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ARTIST} from "../../queries";
import Artist from "../listItems/Artist";

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const ArtistDetails = props => {
    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_ARTIST, { variables: {id} });
    if (loading) return 'Loading...'
    if (error) return `Errror! ${error.message}`
    return (
        <div>
            <Link to="/">Back</Link>
            <div>
                @TODO Display artist data
                <p>{JSON.stringify(data)}</p>
            </div>
        </div>
    )
}

export default ArtistDetails
