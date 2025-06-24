import { toast } from "react-toastify";
import api from "../../config/api";
import header from "../../config/uri_header.json";

export const _createQuestion = async (data: any) => {
  try {
    const response = await api.post("/QuestionBruker", data, {
      headers: header,
    });

    toast.success("Spørsmålet er registrert!", { autoClose: 2000 });
    if (response.data) {
      return response.data.isValid;
    } else {
      return false;
    }
  } catch (error) {
    toast.error("Feil ved registrering av spørsmål.", { autoClose: 2000 });
    return false;
  }
};

export const _getAllQuestion = async () => {
  try {
    const response = await api.get(`/QuestionBruker`);
    if (response.data.length > 0) {
      return response.data;
    } else {
      toast.info("Det finnes ingen poster i databasen", { autoClose: 2000 });
    }
  } catch (error) {
    console.error("Feil ved lasting av spørreskjemalisten", error, {
      autoClose: 3000,
    });

    toast.error("Feil ved lasting av spørreskjemalisten", {
      autoClose: 2000,
    });
  }
};

export const _UpdateQuestion = async (objID: any) => {
  console.log(objID);
  try {
    const response = await api.put(
      `/QuestionBruker/?IdQuestion=${objID.objID}`,
      objID,
      { headers: header }
    );

    toast.success("Spørsmålet ble oppdatert!", { autoClose: 3000 });
    return response.data.isValid ?? false;
  } catch (error) {
    toast.error("Feil under oppdatering av spørsmål.", { autoClose: 2000 });
    return false;
  }
};

export const _findQuestion = async (objID: any) => {
  try {
    const response = await api.get(
      `/QuestionBruker/FindQuestion?objID=${objID}`
    );
    if (response.data) {
      return response.data;
    } else {
      toast.info("Det finnes ingen poster i databasen", { autoClose: 3000 });
      return null;
    }
  } catch (error) {
    console.error("Feil ved innlasting av spørsmålsliste!", error, {
      autoClose: 3000,
    });

    toast.error("Feil ved innlasting av spørsmålsliste!", { autoClose: 3000 });
  }
};

export const _DeleteQuestion = async (objID: any) => {
  try {
    const response = await api.delete(`/QuestionBruker?IdQuestion=${objID}`);
    return response.data.isValid ?? false;
  } catch (error) {
    toast.error("Feil ved sletting av spørsmål.", { autoClose: 3000 });
    return false;
  }
};
