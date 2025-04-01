"use client"

import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import { Headphones, PlayFill, StopFill } from "react-bootstrap-icons"

const VoiceCard = ({ voice, onClick }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlayClick = (e) => {
        e.stopPropagation()
        setIsPlaying(!isPlaying)
        // 실제 오디오 재생 로직 추가
    }

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Card className="h-100 shadow-sm transition-card" onClick={onClick} style={{ cursor: "pointer" }}>
            <div
                className="text-center py-3"
                style={{
                    background: "linear-gradient(to right, rgba(13, 110, 253, 0.1), rgba(13, 110, 253, 0.05))",
                }}
            >
                <Headphones size={24} className="text-primary" />
            </div>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                    <Card.Title className="mb-1">{voice.name}</Card.Title>
                    <Card.Text className="text-muted small">{formatDate(voice.createdAt)}</Card.Text>
                </div>
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-circle"
                    style={{ width: "32px", height: "32px", padding: 0 }}
                    onClick={handlePlayClick}
                >
                    {isPlaying ? <StopFill /> : <PlayFill />}
                </Button>
            </Card.Body>
            <div
                style={{
                    height: "4px",
                    background: "linear-gradient(to right, #0d6efd, rgba(13, 110, 253, 0.5))",
                }}
            />
        </Card>
    )
}

export default VoiceCard

