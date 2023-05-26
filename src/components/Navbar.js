import React, { useState } from 'react';
import '../CSS/Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Input } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import Modal from 'react-modal';
import { ExpandMore } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import firebase from 'firebase/compat/app';

export default function Navbar() {
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const handleQuestion = (e) => {
    e.preventDefault();
    setOpenModal(false);

    db.collection('questions').add({
      question: input,
      imageUrl: inputUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
    });

    setInput('');
    setInputUrl('');
  };

  const [activeTab, setActiveTab] = useState('home'); // Add state for active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [showNotificationScreen, setShowNotificationScreen] = useState(false);
  const handleNotificationClick = () => {
    setShowNotificationScreen(true);
  };

  const closeNotificationScreen = () => {
    setShowNotificationScreen(false);
  };

  const [showSpacesScreen, setShowSpacesScreen] = useState(false);
  const handleSpacesClick = () => {
    setShowSpacesScreen(true);
  };

  const closeSpacesScreen = () => {
    setShowSpacesScreen(false);
  };

  return (
    <div className="qHeader">
      <div className="qHeader__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
          alt=""
        />
      </div>
      <div className="qHeader__icons">
        <div
          className={`qHeader__icon ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabChange('home')}
        >
          <HomeIcon />
        </div>
        <div className="qHeader__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div
          className={`qHeader__icon ${activeTab === 'spaces' ? 'active' : ''}`}
          onClick={handleSpacesClick}
        >
          <PeopleAltOutlinedIcon />
        </div>
        <div
          className={`qHeader__icon ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={handleNotificationClick}
        >
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div className="qHeader__input">
        <SearchIcon />
        <input type="text" placeholder="Search Quora" />
      </div>
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
          <Avatar
            src={user.photo}
            onClick={() => auth.signOut()}
          />
        </div>
        <LanguageIcon />
        <Button onClick={() => setOpenModal(true)}>Add Question</Button>
        <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: '1000',
              top: '50%',
              left: '50%',
              marginTop: '-300px',
              marginLeft: '-350px',
            },
          }}
        >
          <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={user.photo}
            />
            <p>{user.displayName ? user.displayName : user.email} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc."
            />
            <div className="modal__fieldLink">
              <LinkIcon />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclued a link that gives context"
              />
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
            <button type="sumbit" onClick={handleQuestion} className="add">
              Add Question
            </button>
          </div>
        </Modal>
      </div>
      {showNotificationScreen && (
        <div className="notification-screen">
          <h2>You have no notifications now</h2>
          <p>Please explore and follow people to see more content.</p>
          <button className="close-notification" onClick={closeNotificationScreen}>
            Close
          </button>
        </div>
      )}

        {showSpacesScreen && (
            <div className="spaces-screen">
            <h2>You Are Not Following Any Spaces</h2>
            <p>Please explore and follow spaces to see more content.</p>
            <button className="close-spaces" onClick={closeSpacesScreen}>
                Close
            </button>
            </div>
        )}
    </div>
  );
}
