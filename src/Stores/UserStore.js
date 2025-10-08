import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// define the initial state
const initialState = {
  user: null, // Initially no user is logged in
  role: null, // Initially no user role is set
  branch_name: null,
  token: null,
};

const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Function to set user on login
      setUser: (userData) => set({ user: userData }),

      // Function to set user role on login
      setRole: (role) => set({ role: role }),

      // Function to set user token on login
      setToken: (token) => set({ token: token }),

      setIsSubscribed: (isSubscribed) => {
        const { user } = get();
        set({ user: { ...user, is_subscribed: isSubscribed } });
      },

      // Function to set user selected branch on login
      setSelectedBranch: (selectedBranch) => {
        const { user } = get();
        set({ user: { ...user, selected_branch: selectedBranch } });
      },

      setBranchName: (branchName) => set({ branch_name: branchName }),

      // Function to set user profile completion status on login
      setIsProfileCompleted: (isProfileCompleted) => {
        const { user } = get();
        set({ user: { ...user, complete_profile: isProfileCompleted } });
      },

      // Function to set user new account type on login
      setNewAccountType: (type) => {
        const { user } = get(); // Get the current user from the state
        set({ user: { ...user, party_ledgers_account_type: type } });
      },

      // Function to clear user on logout
      clearUser: () => set(initialState),

      // ✅ Add helper functions for access
      hasFullAccess: () => {
        const { user } = get();
        return user?.has_subscription_full_access === true;
      },

    }),
    {
      name: 'user-storage', // Key for localStorage
      partialize: (state) => ({ user: state.user, role: state.role }), // Only persist the `user` part
    }
  )
);

export default useUserStore;
