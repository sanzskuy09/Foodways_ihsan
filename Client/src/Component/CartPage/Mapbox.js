import { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Button, Modal } from "react-bootstrap";

import MapPicker from "./../../Assets/Images/location-picker.svg";

const Mapbox = ({ showMap, setShowMap }) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibW5zYW56IiwiYSI6ImNrbXNzZjJ1dzBpOHcyb3BvNWw1NHV3eG0ifQ.Z_04LU2RBESzZSpxGvFENg";

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "70vh",
    latitude: -6.412,
    longitude: 106.819,
    zoom: 15,
  });

  return (
    <>
      <Modal show={showMap} onHide={setShowMap} size="xl" centered>
        <Modal.Body className="modal-mapbox">
          <ReactMapGL
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mnsanz/ckmdfjmjtifat17qo8obecacs"
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <div className="d-flex justify-content-center container">
              <div className="d-flex flex-column modal-delivery py-2 px-3">
                <div className="text-delivery mb-3">
                  <strong> Select delivery location</strong>
                </div>
                <div className="d-flex align-items-center text-delivery mb-4">
                  <img src={MapPicker} alt={MapPicker} className="mr-3" />
                  <div className="subtext-delivery">
                    <b className="text-city">Depok</b>
                    <div className="text-address">
                      Jl.Bojong Pondok Terong Rt01/02 Kel. Bojong pondok terong
                      kec. pancoran ams
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center btn-deliver">
                  <Button
                    variant="transparant"
                    className="btn-confirm btn-block"
                  >
                    Confirm location
                  </Button>
                </div>
              </div>

              {/* <span
                id="Waiting"
                className="d-none ml-auto card  py-2 px-3  m-2"
              >
                <small className="mb-2">
                  <b>Waiting for the transaction to be approved</b>
                </small>
                <span className="text-danger d-inline">Depok</span>
                <small className="mt-3">
                  <b>Delivery Time</b>
                </small>
                <span>10 - 15 Minutes</span>
              </span>

              <span
                id="Waiting"
                className="d-none box-map card-maps ml-auto card bg-light py-2 px-3 rounded m-2 border border-success"
              >
                <small className="mb-2">
                  <b>Driver is On The Way</b>
                </small>
                <span className="text-danger d-inline">Depok</span>
                <small className="mt-3">
                  <b>Delivery Time</b>
                </small>
                <span>10 - 15 Minutes</span>
                <button className="btn btn-sm btn-dark px-5 btn-order-cart btn-block py-1 mt-3">
                  Finished Order
                </button>
              </span> */}
            </div>
          </ReactMapGL>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Mapbox;
