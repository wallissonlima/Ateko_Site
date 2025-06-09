import api from "../../../config/api";

const find_role_permission = async (
  role: string | undefined
): Promise<any | null> => {
  const response = await api.get(`/Roles/FindAuth?Roles=${role}`);
  return response.data;
};

export default find_role_permission;
