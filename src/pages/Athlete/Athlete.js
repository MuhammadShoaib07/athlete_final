import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/default-avatar.png";
import * as athleteApi from "../../api/athleteAPI";
import { useHistory } from "react-router";

const Athlete = () => {
  const [athlete, setAthlete] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const history = useHistory();

  useEffect(() => {
    getAllAthletes();
  }, []);

  const getAllAthletes = async () => {
    const result = await athleteApi.getAllAthletes();
    setAthlete(result.data);
    setTotalItems(result.count);
  };

  const handlePageChange = async (pagNumber) => {
    const result = await athleteApi.handlePageChange(pagNumber);
    setAthlete(result);
  };

  const deleteHanlder = (id) => {
    let confirmAction = window.confirm("Are you sure to delete it");
    if (confirmAction) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    const result = await athleteApi.deleteAthlete(id);
    if (result) {
      getAllAthletes();
    } else {
      alert("some thing went wrong");
    }
  };

  const editHandler = (id) => {
    history.push("editAthlete", { athlete_id: id });
  };

  const addAthleteHanlder = () => {
    history.push("addAthlete");
  };

  const handyMethod = () => {
    const total = totalItems;
    const itemPerpage = 10;
    const divide = total / itemPerpage;
    let result = Math.ceil(divide);
    let pages = [];
    for (let i = 0; i < result; i++) {
      pages[i] = i + 1;
    }
    return pages;
  };

  let athletes = null;

  if (athlete.length > 0) {
    athletes = athlete.map((athlete, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{athlete.name}</td>
          <td>
            {athlete.image === undefined ? (
              <img
                src={avatar}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={`http://localhost:8000/image/${athlete.image}`}
                style={{ height: "60px", borderRadius: "50%" }}
              />
            )}
          </td>
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
                  editHandler(athlete._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteHanlder(athlete._id);
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
              <h1 class="m-0">Athlete</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Athletes</li>
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
                    <h3 class="card-title">Athletes</h3>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addAthleteHanlder}
                    >
                      Add Athlete
                    </button>
                  </div>
                </div>

                <div class="card-body">
                  <table
                    id="example2"
                    class="table table-bordered table-hover table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>action</th>
                      </tr>
                    </thead>
                    <tbody> {athletes}</tbody>
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

export default Athlete;
