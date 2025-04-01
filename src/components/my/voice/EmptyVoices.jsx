"use client"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { Mic } from "react-bootstrap-icons"

const EmptyVoices = () => {
    const navigate = useNavigate()

    return (
        <div className="text-center py-5">
            <div
                className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "rgba(13, 110, 253, 0.1)",
                }}
            >
                <Mic size={32} className="text-primary" />
            </div>
            <h4 className="mb-2">등록된 목소리가 없습니다</h4>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "400px" }}>
                새로운 목소리를 등록하여 동화에 적용해보세요. 나만의 목소리로 동화를 더욱 특별하게 만들 수 있습니다.
            </p>
            <Button onClick={() => navigate("/dubbing/new")}>목소리 등록하기</Button>
        </div>
    )
}

export default EmptyVoices

