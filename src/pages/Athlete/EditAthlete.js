import React, { useState, useRef, useEffect } from "react";
import * as athleteApi from "../../api/athleteAPI";
import { useHistory, useLocation } from "react-router";

const EditAthlete = () => {
  const athleteInputName = useRef();
  const athleteInputImg = useRef();

  const location = useLocation();
  const history = useHistory();
  const [editAthlete, setEditAthlete] = useState();

  useEffect(() => {
    getAthleteById();
  }, []);

  const getAthleteById = async () => {
    const categoryId = location.state.athlete_id;
    const result = await athleteApi.getAthleteById(categoryId);
    setEditAthlete(result);
  };

  const editAthleteHandler = async (event) => {
    event.preventDefault();

    const athleteName = athleteInputName.current.value;
    const athleteImg = athleteInputImg.current.files[0];

    const athleteId = location.state.athlete_id;

    if (athleteImg !== undefined) {
      const athleteData = new FormData();

      athleteData.append("name", athleteName);
      athleteData.append("image", athleteImg);

      const result = athleteApi.editAthleteWithImg(athleteId, athleteData);

      if (result) {
        alert("edit Successfully");
        history.push("/athlete");
      } else alert("some thing went wrong");
    } else {
      debugger;
      const athleteData = new FormData();
      athleteData.append("name", athleteName);

      const result = athleteApi.editAthleteWithOutImg(athleteId, athleteData);
      if (result) {
        alert("edit Successfully");
        history.push("/athlete");
      } else alert("some thing went wrong");
    }
  };

  const ChangeHanlder = (event) => {
    const { name, value } = event.target;
    setEditAthlete((preValue) => {
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
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Edit Athlete</h3>
                </div>

                <form onSubmit={editAthleteHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        value={editAthlete && editAthlete.name}
                        ref={athleteInputName}
                        name="name"
                        onChange={ChangeHanlder}
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
                            ref={athleteInputImg}
                            onChange={ChangeHanlder}
                          />
                          <label
                            class="custom-file-label"
                            htmlFor="exampleInputFile"
                            name="image"
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
                          editAthlete &&
                          `http://localhost:8000/image/${editAthlete.image}`
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

export default EditAthlete;
