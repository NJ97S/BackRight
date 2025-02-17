import { create } from "zustand";
import { UserInfoType } from "../types/type";
import { getUserInfo } from "../apis/api";

interface useAuthStoreType {
  user: UserInfoType | null;
  isAuthenticated: boolean;
  fetchUserInfo: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<useAuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,

  fetchUserInfo: async () => {
    try {
      const data = await getUserInfo();

      const userInfo: UserInfoType = {
        providerId: data.providerId,
        name: data.name,
        nickname: data.nickname,
        profileImgUrl: data.profileImgUrl,
      };

      set({ user: userInfo, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
