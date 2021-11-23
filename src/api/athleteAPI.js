import axios from "axios";
import API_URL from "./http";
import { config, config1 } from "./config";

const getAllAthletes = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: API_URL + "/admin/athlete",
      headers: config,
    });

    if (response.status === 200) {
      return {
        data: response.data.data.athlete,
        count: response.data.count,
      };
    }
  } catch (error) {
    alert(error);
  }
};

const getAthleteById = async (id) => {
  try {
    const response = await axios({
      method: "Get",
      url: API_URL + "/admin/athlete/" + id,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.athlete;
    }
  } catch (err) {
    alert(err);
  }
};

const handlePageChange = async (pageNum) => {
  try {
    const response = await axios({
      method: "GEt",
      url: API_URL + "/admin/athlete/?page=" + pageNum,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.athlete;
    }
  } catch (error) {
    alert(error);
  }
};

const addAthlete = async (athleteData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/athlete",
      headers: config1,
      data: athleteData,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const deleteAthlete = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: API_URL + "/admin/athlete/" + id,
      headers: config,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const editAthleteWithImg = async (id, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/athlete/" + id,
      headers: config1,
      data: data,
    });
    if (response.data === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const editAthleteWithOutImg = async (id, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/athlete/" + id,
      headers: config1,
      data: data,
    });
    if (response.data === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

export {
  getAllAthletes,
  getAthleteById,
  handlePageChange,
  deleteAthlete,
  addAthlete,
  editAthleteWithImg,
  editAthleteWithOutImg,
};
