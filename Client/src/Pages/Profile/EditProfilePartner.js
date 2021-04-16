import InputImage from "../../Assets/Images/input-img.png";
import Map from "../../Assets/Images/map.svg";

const EditProfilePartner = () => {
  return (
    <div className="container">
      <div className="container-edit">
        <div className="profile">
          <h3 className="title-profile">Edit Profile</h3>
          <div className="profile-wrapper">
            <div className="text-input">
              <input type="text" className="" placeholder="Full Name" />
              <input type="file" id="file" className="col-md-2" />
              <label for="file">
                Attach Image
                <img src={InputImage} alt="" />
              </label>
            </div>
            <div className="text-input">
              <input type="text" className="col-md-12" placeholder="Email" />
            </div>
            <div className="text-input">
              <input type="text" className="col-md-12" placeholder="Phone" />
            </div>

            <div className="text-input">
              <input type="text" className="" placeholder="Location" />
              <button className="btn input-map">
                Selcet on Map
                <img src={Map} alt={Map} className="img-map" />
              </button>
            </div>

            <div className="input-save">
              <button className="btn btn-save"> Save </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePartner;
