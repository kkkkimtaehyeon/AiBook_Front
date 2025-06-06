import {create} from "zustand";


// Zustand 스토어 생성
const useStoryStore = create((set) => ({
    storyId: "",
    currentPage: 1,
    storyContext: "",
    selectedSentences: [],
    baseStory: "",
    coverImageBase64: "",

    clear: () => {
        set({
            currentPage: 1,
            storyContext: "",
            selectedSentences: []
        })
    },
    setCoverImageBase64: (base64) => {
      set({coverImageBase64: base64});
    },

    setCurrentPage: (page) => {
        set({currentPage: page});
    },

    // 스토리 ID 설정 (스토리를 새로 만들 때 사용)
    setStoryId: (id) => {
        localStorage.setItem("storyId", id);
        set({storyId: id});
    },

    setStoryContext: (context) => {
        set({storyContext: context});
    },

    setBaseStory: (baseStory) => {
        set({baseStory: baseStory});
    },

    addSelectedSentence: (page, sentence) => {
        let index = page - 1; // 페이지 번호를 인덱스로 변환 (0부터 시작)
        if (index === 0) {
            set({selectedSentences: [sentence]});
        } else {
            set((state) => {
                const newSelectedSentences = [...state.selectedSentences];
                newSelectedSentences[index] = sentence; // 해당 인덱스에 문장을 추가
                return { selectedSentences: newSelectedSentences };
            });
        }
    },


    // 페이지 번호 설정
    setPageNumber: (page) => set({pageNumber: page}),

    setExStory: (exStory) => set({exStory: exStory}),
    cleanExStory: () => set({exStory: ""}),

    // 새로고침 시 localStorage에서 데이터 복구
    restoreState: () => {
        const savedStoryId = localStorage.getItem("storyId");
        if (savedStoryId) {
            set({storyId: savedStoryId});
        }
    },
}));

export default useStoryStore;
