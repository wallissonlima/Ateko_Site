import { toast } from "react-toastify";
import api from "../../config/api";
import header from "../../config/uri_header.json";

export const _createProduto = async (data: any) => {
  try {
    const response = await api.post("/LeverandorProdukts", data, {
      headers: header,
    });

    toast.success("Produto cadastrado com sucesso!", { autoClose: 2000 });
    if (response.data) {
      return response.data.isValid;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });

    toast.error("Erro ao cadastrar produto.", { autoClose: 2000 });
    return false;
  }
};

export const _getAllProdutos = async () => {
  try {
    const response = await api.get(`/LeverandorProdukts`);
    if (response.data.length > 0) {
      return response.data;
    } else {
      toast.info("Não existe registros na base de dados", { autoClose: 2000 });
    }
  } catch (error) {
    console.error("Erro ao carregar a lista dos produtos", error, {
      autoClose: 1500,
    });

    toast.error("Erro ao carregar a lista dos produtos", {
      autoClose: 1500,
    });
  }
};

export const _getAllFornecedorProdutos = async (IdFornecedor: any) => {
  try {
    const response = await api.get(
      `/LeverandorProdukts/FindAllDescriptionByFornecedor?IdFornecedor=${IdFornecedor}`
    );
    console.log(response)
    if (response.data.length > 0) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    // console.error("Erro ao carregar as fazendas do cliente:", error);
    throw error;
  }
};
