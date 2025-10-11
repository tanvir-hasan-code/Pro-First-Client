import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-role", email],
    queryFn: async () => {
      if (!email) return null;
      const response = await axiosSecure.get(`/users/${email}/role`);
      return response.data.role; // backend sends { role: "admin" }
    },
    enabled: !!email, // only fetch if email exists
  });

  return { role: data, isLoading, error, refetch };
};

export default useUserRole;
