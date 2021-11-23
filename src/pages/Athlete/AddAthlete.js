import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import * as categoryAPi from "../../api/athleteAPI";

const NewAthlete = () => {
  const athleteInputNmae = useRef();
  const athleteInputImg = useRef();

  const history = useHistory();

  const newAthleteHandler = async (event) => {
    event.preventDefault();

    const athleteName = athleteInputNmae.current.value;
    const athleteImg = athleteInputImg.current.files[0];

    const formData = new FormData();
    formData.append("name", athleteName);
    formData.append("image", athleteImg);

    const result = await categoryAPi.addAthlete(formData);
    if (result) {
      alert("item has been added successfully");
      history.push("/athlete");
    } else {
      alert("some thing went wrong");
    }
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
                  <h3 class="card-title">New Athlete</h3>
                </div>

                <form onSubmit={newAthleteHandler}>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Name"
                        ref={athleteInputNmae}
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

export default NewAthlete;
