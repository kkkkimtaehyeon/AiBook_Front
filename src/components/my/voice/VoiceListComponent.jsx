"use client"

import { useEffect, useState } from "react"
import { Row, Col, Spinner } from "react-bootstrap"
import VoiceCard from "./VoiceCard"
import EmptyVoices from "./EmptyVoices"
import jwtAxios from "../../../common/JwtAxios.js";

const VoiceListComponent = () => {
    const [voices, setVoices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getVoices()
    }, [])

    const getVoices = () => {
        setIsLoading(true)
        const url = "http://localhost:8080/api/voices"
        jwtAxios
            .get(url)
            .then((response) => {
                if (response.data.success) {
                    setVoices(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleVoiceClick = (voiceId) => {
        // Navigate to voice detail or select voice
        console.log("Selected voice:", voiceId)
    }

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (voices.length === 0) {
        return <EmptyVoices />
    }

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {voices.map((voice) => (
                <Col key={voice.id}>
                    <VoiceCard voice={voice} onClick={() => handleVoiceClick(voice.id)} />
                </Col>
            ))}
        </Row>
    )
}

export default VoiceListComponent

