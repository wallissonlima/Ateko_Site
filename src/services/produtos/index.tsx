import { toast } from "react-toastify";
import api from "../../config/api";

export const _getAllFornecedorProdutos = async () => {
  try {
    const response = await api.get(`/LeverandorProdukts`);
    if (response.data.length > 0) {
      return response.data;
    } else {
      toast.info("Não existe registros na base de dados", { autoClose: 2000 });
    }
  } catch (error) {
    console.error("Erro ao carregar a lista dos fornecedores", error, {
      autoClose: 1500,
    });

    toast.error("Erro ao carregar a lista dos fornecedores", {
      autoClose: 1500,
    });
  }
};
