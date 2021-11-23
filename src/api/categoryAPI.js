import axios from "axios";
import API_URL from "./http";
import { config, config1 } from "./config";

const getAllCategory = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: API_URL + "/admin/categories",
      headers: config,
    });

    if (response.status === 200) {
      return {
        data: response.data.data.category,
        count: response.data.count,
      };
    }
  } catch (err) {
    alert(err);
  }
};

const getCategoryById = async (id) => {
  try {
    const response = await axios({
      method: "Get",
      url: API_URL + "/admin/categories/" + id,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.category;
    }
  } catch (err) {
    alert(err);
  }
};

const handlePageChange = async (pageNum) => {
  try {
    const response = await axios({
      method: "GEt",
      url: API_URL + "/admin/categories/?page=" + pageNum,
      headers: config,
    });
    if (response.status === 200) {
      return response.data.data.category;
    }
  } catch (error) {
    alert(error);
  }
};

const addCategory = async (categoryData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/categories",
      headers: config1,
      data: categoryData,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: API_URL + "/admin/categories" + id,
      headers: config,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (err) {
    alert(err);
  }
};

const editCategoryWithImg = async (id, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/categories/" + id,
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
  debugger;
  try {
    const response = await axios({
      method: "POST",
      url: API_URL + "/admin/categories/" + id,
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
  getAllCategory,
  getCategoryById,
  handlePageChange,
  addCategory,
  deleteCategory,
  editCategoryWithImg,
  editAthleteWithOutImg,
};
