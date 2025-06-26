import { toast } from "react-toastify";
import api from "../../config/api";
import header from "../../config/uri_header.json";

export const _createFornecedor = async (data: any) => {
  try {
    const response = await api.post("/Leverandor", data, {
      headers: header,
    });

    toast.success("Fornecedor cadastrado com sucesso!", { autoClose: 2000 });
    if (response.data) {
      return response.data.isValid;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });

    toast.error("Erro ao cadastrar fornecedor.", { autoClose: 2000 });
    return false;
  }
};

export const _getAllFornecedor = async () => {
  try {
    const response = await api.get(`/Leverandor`);
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

export const _UpdateFornecedor = async (objID: any) => {
  try {
    const response = await api.put(`/Leverandor/?objID=${objID.objID}`, objID, {
      headers: header,
    });

    toast.success("Fornecedor atualizado com sucesso!", { autoClose: 3000 });
    return response.data.isValid ?? false;
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });
    toast.error("Erro ao atualizar Fornecedor.", { autoClose: 2000 });
    return false;
  }
};

export const _findFornecedor = async (objID: any) => {
  try {
    const response = await api.get(`/Leverandor/Find?objID=${objID}`);
    if (response.data) {
      return response.data;
    } else {
      toast.info("Não existe registros na base de dados", { autoClose: 3000 });
      return null;
    }
  } catch (error) {
    console.error("Erro ao carregar a lista de fornecedores", error, {
      autoClose: 3000,
    });

    toast.error("Erro ao carregar a lista de fornecedores", {
      autoClose: 3000,
    });
  }
};

export const _DeleteFornecedor = async (objID: any) => {
  try {
    const response = await api.delete(`/Leverandor?objID=${objID}`);
    // toast.success("Cliente deletado com sucesso!");
    return response.data.isValid ?? false;
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });
    toast.error("Erro ao deletar fornecedor.", { autoClose: 2000 });
    return false;
  }
};
