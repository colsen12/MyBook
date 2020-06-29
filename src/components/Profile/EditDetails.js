import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../App.css";

//Material UI
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions.js";

const EditDetails = (props) => {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const { credentials } = props;

  const handleBio = (credentials) => {
    credentials.bio ? setBio(credentials.bio) : setBio("");
  };

  const handleWebsite = (credentials) => {
    credentials.website ? setWebsite(credentials.website) : setWebsite("");
  };

  const handleLocation = (credentials) => {
    credentials.location ? setLocation(credentials.location) : setLocation("");
  };

  const handleOpen = () => {
    setOpen(true);
    handleBio(credentials);
    handleWebsite(credentials);
    handleLocation(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };
    props.editUserDetails(userDetails);
    setOpen(false);
  };

  useEffect(() => {
    handleBio(credentials);
    handleWebsite(credentials);
    handleLocation(credentials);
  }, [credentials]);

  return (
    <div>
      <button tip="Edit Details" className="edit-profile" onClick={handleOpen}>
        Edit profile
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              tpye="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="Enter some details about yourself"
              value={bio}
              onChange={updateBio}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal website"
              value={website}
              onChange={updateWebsite}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder=""
              value={location}
              onChange={updateLocation}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
