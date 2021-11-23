import React, { useEffect, useState, useRef } from "react";
import * as categoryApi from "../../api/categoryAPI";
import { useHistory, useLocation } from "react-router";

const EditCategory = () => {
  const categoryEditName = useRef();
  const categoryEditImg = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editCategory, SetEditCategory] = useState([]);

  useEffect(() => {
    getCategoryById();
  }, []);

  const getCategoryById = async () => {
    const categoryId = location.state.category_id;
    const result = await categoryApi.getCategoryById(categoryId);
    SetEditCategory(result);
  };

  const editCategoryHandler = async (event) => {
    event.preventDefault();

    const categoryName = categoryEditName.current.value;
    const categoryImg = categoryEditImg.current.files[0];

    const categoryId = location.state.category_id;

    if (categoryImg !== undefined) {
      const categoryData = new FormData();
      categoryData.append("name", categoryName);
      categoryData.append("image", categoryImg);

      const result = categoryApi.editCategoryWithImg(categoryId, categoryData);
      if (result) {
        alert("edit Successfully");
        history.push("/categories");
      } else alert("some thing went wrong");
    } else {
      const categoryData = new FormData();
      categoryData.append("name", categoryName);

      const result = categoryApi.editAthleteWithOutImg(
        categoryId,
        categoryData
      );
      if (result) {
        alert("edit Successfully");
        history.push("/categories");
      } else alert("some thing went wrong");
    }
  };

  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    SetEditCategory((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <div className="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Category</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Category</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit Category</h3>
                </div>

                <form onSubmit={editCategoryHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        onChange={ChangeHanlder}
                        name="name"
                        ref={categoryEditName}
                        value={editCategory && editCategory.name}
                      />
                    </div>

                    <div class="form-group">
                      <label htmlFor="exampleInputFile">File input</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="exampleInputFile"
                            name="image"
                            ref={categoryEditImg}
                            // onChange={categoryChnageImgHanlder}
                          />
                          <label
                            class="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text">Upload</span>
                        </div>
                      </div>
                      <img
                        src={
                          editCategory &&
                          `http://localhost:8000/image/${editCategory.image}`
                        }
                        style={{
                          height: "75px",
                          width: "70px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  </div>

                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditCategory;
