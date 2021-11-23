import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as DiffLvlAPI from "../../api/DiffLvlAPI";

const DifficultyLevel = () => {
  const [difficulty, setDifficulty] = useState([]);
  const [totalItems, setTotalItems] = useState();

  const history = useHistory();

  useEffect(() => {
    getAllDiffLvls();
  }, []);

  const getAllDiffLvls = async () => {
    const result = await DiffLvlAPI.getAllDiffLvls();
    setDifficulty(result.data);
    setTotalItems(result.count);
  };

  const handlePageChange = async (pagNumber) => {
    const result = await DiffLvlAPI.handlePageChange(pagNumber);
    setDifficulty(result);
  };

  const deleteDifficultyHanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    const result = await DiffLvlAPI.deleteDiffLvl(id);
    if (result) {
      getAllDiffLvls();
    } else {
      alert("some thing went wrong");
    }
  };

  const addDifficultyHanlder = () => {
    history.push("addDifficultyLevel");
  };

  const editDifficultyHnalder = (id) => {
    history.push("editDiffLvl", { diff_id: id });
  };

  const handyMethod = () => {
    debugger;
    const total = totalItems;
    const itemPerpage = 10;
    const divide = total / itemPerpage;
    let result = Math.ceil(divide);
    let pages = [];
    for (let i = 0; i < result; i++) {
      pages[i] = i + 1;
    }
    console.log(pages);
    return pages;
  };

  let difficultyLevel;

  if (difficulty.length > 0) {
    difficultyLevel = difficulty.map((difficulty, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{difficulty.name}</td>
          <td> {difficulty.points}</td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  editDifficultyHnalder(difficulty._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteDifficultyHanlder(difficulty._id);
                }}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Diffculty Level</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Diffculty Level</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card">
                <div class="card-header">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 class="card-title">Diffculty Level</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addDifficultyHanlder}
                    >
                      Add Diffculty Level
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table
                    id="example2"
                    class="table table-bordered table-hover table-striped "
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{difficultyLevel}</tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {handyMethod().map((item, id) => {
                      return (
                        <li class="page-item" key={id}>
                          <a
                            class="page-link"
                            onClick={() => handlePageChange(item)}
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DifficultyLevel;
