import React from 'react';
import ProfileCard from '../../Components/ProfileCard';
const About = () => {
    const profileData = {
        name: 'Yacine Kermame',
        job: ' Web Developeur',
        github: 'https://github.com/kaaado',
        picture: require('../../image/yacine.png'),
    };
    const profileData1 = {
        name: 'Mouadh Benbahi',
        job: ' Web Developeur',
        github: 'https://github.com/MouadhBNB7741',
        picture: require('../../image/img_avatar.png'),
    };
    const profileData2 = {
        name: 'Mehdi Melliani',
        job: 'Software Developeur',
        github: 'https://github.com/Meliani-Mehdi',
        picture: require('../../image/img_avatar.png'),
    };
    const profileData3 = {
        name: 'Youssef Azzaz',
        job: 'Desktop Developeur ',
        github: 'https://github.com/',
        picture: require('../../image/img_avatar.png'),
    };
    const profileData4 = {
        name: 'Azzedine Haoud',
        job: 'Mobile Developeur',
        github: 'https://github.com/',
        picture: require('../../image/img_avatar.png'),
    };
    const profileData5 = {
        name: 'Mohamed bouhadda',
        job: 'Software Developeur',
        github: 'https://github.com/',
        picture: require('../../image/img_avatar.png'),    };
    const profileData6 = {
        name: 'Habib Benghribe',
        job: 'Software Developeur',
        github: 'https://github.com/',
        picture: require('../../image/img_avatar.png'),
    };
    ; const profileData7 = {
        name: 'Fatima Hamadouche',
        job: 'Software Developeur',
        github: 'https://github.com/',
        picture: require('../../image/img_avatar.png'),
    };

    return (
        <div className="about" style={{marginTop:'20px', display: "flex", gap: '15px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <ProfileCard {...profileData} />
            <ProfileCard {...profileData1} />
            <ProfileCard {...profileData2} />
            <ProfileCard {...profileData3} />
            <ProfileCard {...profileData4} />
            <ProfileCard {...profileData5} />
            <ProfileCard {...profileData6} />
            <ProfileCard {...profileData7} />
        </div>
    );
};

export default About;
