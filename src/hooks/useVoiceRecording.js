// hooks/useVoiceRecording.js
import { useState, useRef, useCallback } from 'react';
import RecordRTC from 'recordrtc';

export const useVoiceRecording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecording, setHasRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);

    const recorderRef = useRef(null);
    const streamRef = useRef(null);
    const audioRef = useRef(null);

    const startRecording = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 44100,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            streamRef.current = stream;

            const recorder = new RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/wav', // MP3 형식
                recorderType: RecordRTC.StereoAudioRecorder,
                numberOfAudioChannels: 1, // 모노
                desiredSampRate: 44100,
                audioBitsPerSecond: 128000, // 128kbps
                timeSlice: 1000,
                disableLogs: false,
                // MP3 전용 설정
                bufferSize: 16384,
            });

            recorderRef.current = recorder;
            recorder.startRecording();
            setIsRecording(true);
        } catch (err) {
            console.error('마이크 접근 오류:', err);
            setError('마이크에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (recorderRef.current && isRecording) {
            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current.getBlob();
                setAudioBlob(blob);
                setHasRecording(true);
                setIsRecording(false);

                // 스트림 정리
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }

                // 레코더 정리
                recorderRef.current.destroy();
                recorderRef.current = null;
            });
        }
    }, [isRecording]);

    const playRecording = useCallback(() => {
        if (audioBlob && !isPlaying) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
            };

            audio.onerror = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
                setError('오디오 재생 중 오류가 발생했습니다.');
            };

            audio.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.error('재생 오류:', err);
                setError('오디오 재생에 실패했습니다.');
                URL.revokeObjectURL(audioUrl);
            });
        }
    }, [audioBlob, isPlaying]);

    const stopPlaying = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isPlaying]);

    const resetRecording = useCallback(() => {
        if (isPlaying) {
            stopPlaying();
        }

        // 진행 중인 녹음이 있다면 중지
        if (isRecording && recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
                recorderRef.current.destroy();
                recorderRef.current = null;
            });
            setIsRecording(false);
        }

        setHasRecording(false);
        setAudioBlob(null);
        setError(null);
    }, [isPlaying, isRecording, stopPlaying]);

    const reRecord = useCallback(() => {
        resetRecording();
        // resetRecording이 완료된 후 새 녹음 시작
        setTimeout(() => {
            startRecording();
        }, 100);
    }, [resetRecording, startRecording]);

    // 컴포넌트 언마운트 시 정리
    const cleanup = useCallback(() => {
        if (recorderRef.current) {
            if (isRecording) {
                recorderRef.current.stopRecording();
            }
            recorderRef.current.destroy();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [isRecording]);

    return {
        // 상태
        isRecording,
        hasRecording,
        audioBlob,
        isPlaying,
        error,

        // 액션
        startRecording,
        stopRecording,
        playRecording,
        stopPlaying,
        resetRecording,
        reRecord,
        cleanup // 컴포넌트에서 useEffect cleanup에 사용
    };
};