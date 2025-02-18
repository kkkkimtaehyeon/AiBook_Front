import { create } from "zustand";

const useRecordStore = create((set) => ({
    recordings: {}, // { pageNumber: audioBlob }
    saveRecording: (pageNumber, audioBlob) => set((state) => ({
        recordings: { ...state.recordings, [pageNumber]: audioBlob }
    })),
    clearRecordings: () => set({ recordings: {} })
}));

export default useRecordStore;
