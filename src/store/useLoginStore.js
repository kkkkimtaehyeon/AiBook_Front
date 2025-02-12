import {create} from "zustand";

const useLoginStore = create((set) => ({
    isLogin: false,
    memberId: null,
    memberName: null,

    setLogin: (memberId, memberName) => {
        set({
            isLogin: true,
            memberId: memberId,
            memberName: memberName
        });
    },

    setLogout: () => {
        set({
            isLogin: false,
            memberId: null,
            memberName: null
        });
    }
}));

export default useLoginStore;