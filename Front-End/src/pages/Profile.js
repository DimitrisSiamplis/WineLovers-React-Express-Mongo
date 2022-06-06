import React from "react";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const Profile = () => {
  const [userDetails, setUserDetails] = useState();

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  // ------------ Get user Details -----------------
  const getUser = () => {
    fetch(`http://localhost:4000/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUserDetails(json);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {userDetails !== undefined && (
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              {/* <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span className="font-weight-bold"></span>
              <span className="text-black-50"></span>
              <span> </span>
            </div>  */}

              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={
                    userDetails.user.Gender === "Female"
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNBSq3Ijqf7bxwcZxjzcgKm_RYhCWWhK7QTQ&usqp=CAU"
                      : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  }
                />
                <span className="font-weight-bold"></span>
                <span className="text-black-50"></span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Details</h4>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">
                      First Name :{" "}
                      <strong>{userDetails.user.Name.split(" ")[0]}</strong>
                    </label>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">
                      Last Name :{" "}
                      <strong>{userDetails.user.Name.split(" ")[1]}</strong>
                    </label>
                  </div>
                </div>
                <hr />
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">
                      Mobile Number : <strong>{userDetails.user.Mobile}</strong>
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">
                      Address : <strong>{userDetails.user.Address}</strong>{" "}
                    </label>
                  </div>
                  <p></p>
                  <hr />
                  <div className="col-md-12">
                    <label className="labels">
                      Birthday : <strong>{userDetails.user.Birthday}</strong>
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">
                      Gender : <strong>{userDetails.user.Gender}</strong>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
