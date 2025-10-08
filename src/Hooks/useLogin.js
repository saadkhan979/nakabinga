import { useMutation } from '@tanstack/react-query';
import { loginAdmin, loginUser } from '../Services/Auth';
import useUserStore from '../Stores/UserStore';
import { showErrorToast } from '../Utils/Utils';

export function useLogin(role = 'business') {
  const { setUser, setRole, setToken } = useUserStore();

  return useMutation({
    mutationFn: role === 'admin' ? loginAdmin : loginUser,
    onSuccess: async (data) => {
      // Set the user in the store upon successful login
      setUser(data.user);
      setRole(data.role);
      setToken(data.token);
      // Set cookie with JavaScript
      // document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
      document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
    },
    onError: (error) => {
      showErrorToast(error);
      // Handle errors here (e.g., display a notification)
      console.error('Login Failed', error);
    },
  });
}
