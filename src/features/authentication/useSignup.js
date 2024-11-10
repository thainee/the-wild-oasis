import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account created successfully! Please verify the new account from the user's email address"
      );
    },
    onError: (error) => {
      console.error('Error signing up:', error);
      toast.error('Failed to create account');
    },
  });

  return { signup, isPending };
}
