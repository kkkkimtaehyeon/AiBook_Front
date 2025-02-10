import { create } from "zustand";

// Zustand 스토어 생성
const useStoryStore = create((set) => ({
    storyId: null,
    pageNumber: 1,
    exStory: "",

    // 스토리 ID 설정 (스토리를 새로 만들 때 사용)
    setStoryId: (id) => {
        localStorage.setItem("storyId", id);
        set({ storyId: id });
    },

    // 페이지 번호 설정
    setPageNumber: (page) => set({ pageNumber: page }),

    setExStory: (exStory) => set({ exStory: exStory }),
    cleanExStory: () => set({ exStory: "" }),

    // 새로고침 시 localStorage에서 데이터 복구
    restoreState: () => {
        const savedStoryId = localStorage.getItem("storyId");
        if (savedStoryId) {
            set({ storyId: savedStoryId });
        }
    },
}));

export default useStoryStore;
