import axios from "axios";
import API_URL from "./http";
import { config } from "./config";

const getAllDiffLvls = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: API_URL + "/admin/difficulty",
      headers: config,
    });

    if (response.status === 200) {
      return {
        data: response.data.data.difficulty,
        count: response.data.count,
      };
    }
  } catch (error) {
    alert(error);
  }
};

const getDiffLvlById = async (id) => {
  try {
    const response = await axios({
      method: "Get",
      url: API_URL + "/admin/difficulty/" + id,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.difficulty;
    }
  } catch (err) {
    alert(err);
  }
};

const handlePageChange = async (pageNum) => {
  try {
    const response = await axios({
      method: "GEt",
      url: API_URL + "/admin/difficulty/?page=" + pageNum,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.difficulty;
    }
  } catch (error) {
    alert(error);
  }
};

const addDiffLvl = async (difflvlData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/difficulty",
      headers: config,
      data: difflvlData,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const deleteDiffLvl = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: API_URL + "/admin/difficulty/" + id,
      headers: config,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const editDiffLvl = async (id, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/difficulty/" + id,
      headers: config,
      data: data,
    });
    if (response.data === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

export {
  getAllDiffLvls,
  getDiffLvlById,
  handlePageChange,
  addDiffLvl,
  deleteDiffLvl,
  editDiffLvl,
};
