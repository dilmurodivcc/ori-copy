import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../API';

const useGetUser = () => {
  const fetchUser = async () => {
    const response = await API.get('/user/');
    return response.data;
  };
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });
  console.log(user);
  return { user, isUserLoading, userError };
};

const useChangeUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { first_name: string; image: string | null }) => {
      const formData = new FormData();
      formData.append('first_name', data.first_name);

      if (data.image && data.image.startsWith('data:image')) {
        const base64Response = await fetch(data.image);
        const blob = await base64Response.blob();
        formData.append('image', blob, 'profile.jpg');
      }

      const response = await API.patch('/user/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    changeUser: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};

const useGetSavedBooks = () => {
  const fetchSavedBooks = async () => {
    const response = await API.get('/user/saved-books/');
    return response.data;
  };
  const {
    data: saved_Books,
    isLoading: isSavedBooksLoading,
    error: savedBooksError,
  } = useQuery({
    queryKey: ['savedBooks'],
    queryFn: () => fetchSavedBooks(),
  });
  console.log('saved_Books', saved_Books);
  return { saved_Books, isSavedBooksLoading, savedBooksError };
};

const useDeleteSavedBook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await API.delete(`/user/saved-books/${bookId}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedBooks'] });
    },
  });

  return {
    deleteSavedBook: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};

const useGetUserBalance = () => {
  const fetchUserBalance = async () => {
    const response = await API.get('/user/balance/');
    return response.data;
  };
  const {
    data: userBalance,
    isLoading: isUserBalanceLoading,
    error: userBalanceError,
  } = useQuery({
    queryKey: ['userBalance'],
    queryFn: () => fetchUserBalance(),
  });
  return { userBalance, isUserBalanceLoading, userBalanceError };
};

export { useGetUser, useChangeUser, useGetSavedBooks, useDeleteSavedBook, useGetUserBalance };
