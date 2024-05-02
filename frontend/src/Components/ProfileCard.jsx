import React from 'react';
import PropTypes from 'prop-types';
import './ProfileCard.css';

const ProfileCard = ({ name, job, github, picture }) => {
    return (
        <div className="profile-card">
            <div className="image">
                <img src={picture} alt="" className="profile-pic" />
            </div>
            <div className="data">
                <h2>{name}</h2>
                <span>{job}</span>
            </div>
            <div className="buttons">
                <a href={github} className="btn" target="_blank" rel="noopener noreferrer">
                    Github
                </a>
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
};

export default ProfileCard;
