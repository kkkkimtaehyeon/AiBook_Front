// components/VoiceRecorder.jsx
import React from 'react';
import { Button, Row, Col, Alert, Modal, Form } from 'react-bootstrap';
import { useVoiceRecording } from '../hooks/useVoiceRecording';

const VoiceRecorder = ({
                           onRecordingComplete,
                           showPreview = true,
                           showReRecord = true,
                           recordButtonText = '녹음 시작',
                           stopButtonText = '녹음 중지',
                           reRecordButtonText = '다시 녹음',
                           previewButtonText = '미리듣기',
                           stopPreviewButtonText = '정지',
                           submitButtonText = '등록하기',
                           onSubmit,
                           className = '',
                           buttonSize = 'lg',
                           modalTitle = '음성 등록',
                           nameLabel = '이름',
                           namePlaceholder = '음성 파일 이름을 입력하세요',
                           confirmButtonText = '확인',
                           cancelButtonText = '취소'
                       }) => {
    const {
        isRecording,
        hasRecording,
        audioBlob,
        isPlaying,
        error,
        startRecording,
        stopRecording,
        playRecording,
        stopPlaying,
        reRecord
    } = useVoiceRecording();

    const [showModal, setShowModal] = React.useState(false);
    const [voiceName, setVoiceName] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleRecordingToggle = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleSubmit = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setVoiceName('');
    };

    const handleConfirmSubmit = async () => {
        if (!voiceName.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        if (onSubmit && audioBlob) {
            setIsSubmitting(true);
            try {
                await onSubmit(audioBlob, voiceName.trim());
                handleModalClose();
                // 성공적으로 등록되면 녹음 상태 초기화 (선택사항)
                // resetRecording();
            } catch (error) {
                console.error('음성 등록 실패:', error);
                alert('음성 등록에 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && voiceName.trim()) {
            handleConfirmSubmit();
        }
    };

    // 녹음 완료 시 콜백 호출
    React.useEffect(() => {
        if (hasRecording && audioBlob && onRecordingComplete) {
            onRecordingComplete(audioBlob);
        }
    }, [hasRecording, audioBlob, onRecordingComplete]);

    return (
        <div className={className}>
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Row className="mb-3">
                <Col className="d-flex justify-content-center">
                    {!hasRecording ? (
                        <Button
                            variant={isRecording ? "danger" : "outline-danger"}
                            onClick={handleRecordingToggle}
                            size={buttonSize}
                            disabled={!!error}
                        >
                            {isRecording ? stopButtonText : recordButtonText}
                        </Button>
                    ) : (
                        <div className="d-flex gap-3">
                            {showReRecord && (
                                <Button
                                    variant="outline-secondary"
                                    onClick={reRecord}
                                    size={buttonSize}
                                >
                                    {reRecordButtonText}
                                </Button>
                            )}
                            {showPreview && (
                                <Button
                                    variant="outline-info"
                                    onClick={isPlaying ? stopPlaying : playRecording}
                                    size={buttonSize}
                                >
                                    {isPlaying ? stopPreviewButtonText : previewButtonText}
                                </Button>
                            )}
                        </div>
                    )}
                </Col>
            </Row>

            {/* 상태 표시 */}
            {isRecording && (
                <Row>
                    <Col className="text-center">
                        <div className="text-danger">
                            <strong>🎤 녹음 중입니다...</strong>
                        </div>
                    </Col>
                </Row>
            )}

            {hasRecording && !isRecording && (
                <Row>
                    <Col className="text-center">
                        {isPlaying && (
                            <div className="text-info mt-2">
                                <strong>🔊 재생 중...</strong>
                            </div>
                        )}
                    </Col>
                </Row>
            )}

            {onSubmit && audioBlob && (
                <Row>
                    <div>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            size={buttonSize}
                        >
                            {submitButtonText}
                        </Button>
                    </div>
                </Row>
            )}

            {/* 이름 입력 모달 */}
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>{nameLabel}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={namePlaceholder}
                                value={voiceName}
                                onChange={(e) => setVoiceName(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isSubmitting}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleModalClose}
                        disabled={isSubmitting}
                    >
                        {cancelButtonText}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirmSubmit}
                        disabled={!voiceName.trim() || isSubmitting}
                    >
                        {isSubmitting ? '등록 중...' : confirmButtonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VoiceRecorder;