import { toast } from "react-toastify";
import api from "../../config/api";
import header from "../../config/uri_header.json";

export const _createQuestion = async (data: any) => {
  try {
    const response = await api.post("/QuestionBruker", data, {
      headers: header,
    });

    toast.success("Pergunta cadastrado com sucesso!", { autoClose: 2000 });
    if (response.data) {
      return response.data.isValid;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });

    toast.error("Erro ao cadastrar Pergunta.", { autoClose: 2000 });
    return false;
  }
};

export const _getAllQuestion = async () => {
  try {
    const response = await api.get(`/QuestionBruker`);
    if (response.data.length > 0) {
      return response.data;
    } else {
      toast.info("Não existe registros na base de dados", { autoClose: 2000 });
    }
  } catch (error) {
    console.error("Erro ao carregar a lista de questionario", error, {
      autoClose: 3000,
    });

    toast.error("Erro ao carregar a lista de questionario", {
      autoClose: 2000,
    });
  }
};

export const _UpdateQuestion = async (data: any) => {
  try {
    const response = await api.put(
      `/QuestionBruker/?objID=${data.objID}`,
      data,
      { headers: header }
    );

    toast.success("Pergunta atualizado com sucesso!", { autoClose: 3000 });
    return response.data.isValid ?? false;
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 2000 });
    toast.error("Erro ao atualizar Pergunta.", { autoClose: 2000 });
    return false;
  }
};

export const _DeleteQuestion = async (objID: any) => {
  try {
    const response = await api.delete(`/QuestionBruker?IdQuestion=${objID}`);
    // toast.success("Cliente deletado com sucesso!");
    return response.data.isValid ?? false;
  } catch (error) {
    console.error("Erro na requisição:", error, { autoClose: 3000 });
    toast.error("Erro ao deletar pergunta.", { autoClose: 3000 });
    return false;
  }
};
