import React, { useState } from 'react';
import './AccountSettings.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { updateUser } from "../../actions/userAction";
import { uploadImage } from "../../actions/uploadAction";

const AccountSettings = () => {
    const initialState = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        livesin: "",
        country: "",
        relationship: "",
        worksAt: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const param = useParams();
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === "profileImage"
                ? setProfileImage(img)
                : setCoverImage(img);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append("name", fileName);
            data.append("file", profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(updateUser(param._id, UserData));
    };

    return (
        <div className='AccountSettings'>
            <form className="infoForm" onSubmit={handleSubmit}>
                <h1>Your Account</h1>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="firstname"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formData.firstname || ''}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formData.lastname || ''}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={formData.username || ''}
                    />
                    <input
                        type="password"
                        className="infoInput"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password || ''}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="livesin"
                        placeholder="Lives in"
                        onChange={handleChange}
                        value={formData.livesin || ''}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        value={formData.country || ''}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        placeholder="RelationShip Status"
                        name="relationship"
                        onChange={handleChange}
                        value={formData.relationship || ''}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="worksAt"
                        placeholder="Works at"
                        onChange={handleChange}
                        value={formData.worksAt || ''}
                    />
                </div>
                <div>
                    Profile Image 
                    <input type="file" className="infoInput" name='profileImage' onChange={onImageChange}/>
                    Cover Image
                    <input type="file" className="infoInput" name="coverImage" onChange={onImageChange}/>
                </div>
                <button className="button infoButton" type="submit">
                    Update
                </button>
            </form>
        </div>
    );
};

export default AccountSettings;
