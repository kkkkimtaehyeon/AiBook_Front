// hooks/useVoiceRecording.js
import { useState, useRef, useCallback } from 'react';

export const useVoiceRecording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecording, setHasRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(null);

    const startRecording = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(audioBlob);
                setHasRecording(true);

                // 스트림 정리
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error('마이크 접근 오류:', err);
            setError('마이크에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
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

            audio.play();
            setIsPlaying(true);
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
        setHasRecording(false);
        setAudioBlob(null);
        setError(null);
    }, [isPlaying, stopPlaying]);

    const reRecord = useCallback(() => {
        resetRecording();
        startRecording();
    }, [resetRecording, startRecording]);

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
        reRecord
    };
};