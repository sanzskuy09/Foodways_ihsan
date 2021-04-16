import { Table } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";

import { UserContext } from "../Contexts/userContext";

import Success from "../Assets/Images/success.svg";
import Cancel from "../Assets/Images/cancel.svg";
import Pending from "../Assets/Images/clock.svg";
import ButtonApprove from "../Assets/Images/button-approve.svg";
import ButtonCancel from "../Assets/Images/button-cancel.svg";

const Dashboard = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const { data: incomeData, isLoading, refetch } = useQuery(
    "incomeCache",
    async () => {
      const response = await API.get("/transactions");
      return response.data.data.transactions;
    }
  );

  const changeStatus = useMutation(async (payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      status: payload.status,
    };
    setAuthToken(localStorage.token);
    const response = await API.patch(
      `/transaction/${payload.id}`,
      body,
      config
    );
    refetch();
  });

  const handleStatus = (id, status) => {
    changeStatus.mutate({ id, status });
  };

  return (
    <div className="container">
      <div className="container-edit">
        <div className="profile">
          <h3 className="title-profile">Income Transaction</h3>
          <div className="profile-wrapper">
            <Table bordered hover className="table-list">
              <thead style={{ backgroundColor: "#E5E5E5" }}>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Product Order</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center", width: "191px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#FFF" }}>
                {isLoading ? (
                  <h1>loading</h1>
                ) : (
                  <>
                    {incomeData?.map((income, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{income.userOrder.fullName}</td>
                        <td>{income.userOrder.location}</td>
                        <td>
                          {income?.orders
                            ?.map((order) => order.product.title)
                            .join(", ")}
                        </td>
                        <td
                          className={
                            income.status === "Waiting Approve"
                              ? "text-warning"
                              : income.status === "Success"
                              ? "text-success"
                              : income.status === "On the Way"
                              ? "text-primary"
                              : "text-danger"
                          }
                        >
                          {income.status}
                        </td>
                        <td className="tb-action">
                          {income.status === "Waiting Approve" ? (
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-cancel mr-2"
                                onClick={() =>
                                  handleStatus(income.id, "Cancel")
                                }
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-approve"
                                onClick={() =>
                                  handleStatus(income.id, "On the Way")
                                }
                              >
                                Approve
                              </button>
                            </div>
                          ) : income.status === "Success" ? (
                            <img src={Success} alt="{Success}" />
                          ) : income.status === "On the Way" ? (
                            <img
                              src={Pending}
                              alt="{Pending}"
                              style={{ width: "22px", height: "22px" }}
                            />
                          ) : (
                            <img src={Cancel} alt="{Cancel}" />
                          )}
                        </td>
                      </tr>
                    ))}{" "}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
