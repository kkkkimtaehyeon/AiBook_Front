import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
    persist(
        (set) => ({
            isLogin: false,
            memberId: null,
            memberName: null,

            setLogin: (memberId, memberName) => {
                console.log("login: ", memberId, memberName);
                set({
                    isLogin: true,
                    memberId: memberId,
                    memberName: memberName
                });
            },

            setLogout: () => {
                localStorage.removeItem('access-token');
                deleteCookie("refresh-token")
                set({
                    isLogin: false,
                    memberId: null,
                    memberName: null
                });
            }
        }),
        {
            name: "login-storage", // localStorage에 저장될 키
            getStorage: () => localStorage, // 저장소를 localStorage로 지정
        }
    )
);

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}

export default useLoginStore;
