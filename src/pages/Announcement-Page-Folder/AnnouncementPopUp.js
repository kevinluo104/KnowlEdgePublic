import React from 'react';
import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import { addAnnouncementAsync } from './redux/thunks';
import { useParams } from 'react-router-dom';
// citation for line: https://stackoverflow.com/questions/40697231/horizontal-line-in-the-middle-of-divs
const ButtonStyled = styled(Button)`
  background-color: #0074d9;

  &:hover {
    background-color: #007499;
  }
`;
// Citation for making elements appear and disappear on click: https://www.youtube.com/watch?v=uXk62ZgPH-4&ab_channel=Accessworld
// learnt how to add and remove elements dynamically from Code Academy in this case the form for adding elements
// Citation for popup: https://www.youtube.com/watch?v=i8fAO_zyFAM&ab_channel=TylerPotts
function AnnouncementPopUp({ trigger, setTrigger, studentUid }) {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch(); 
  const [title, setTitle] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const { '*': dynamicSegmentValue } = useParams();

  const uid = useSelector((state) => state.user.currentUser.uid);

  const username = useSelector((state) => state.user.currentUser.displayName);
 
  useEffect(() => {
    if (trigger) {
      setTitle('');
      setAnnouncement('');
    }
  }, [trigger]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) return;
    if (!announcement) return;
    dispatch(
      addAnnouncementAsync({
        uid: uid,
        card: {
          announcementId: Date.now(),
          announcementCourse: dynamicSegmentValue,
          username: username,
          announcement: announcement,
          announcementTitle: title,
          announcementStudentUid: studentUid,
        },
      })
    );
    setTrigger(false);
  };

  return (
    <div ref={rootRef}>
      <Modal
        dismissible
        show={trigger === true}
        root={rootRef.current ?? undefined}
        onClose={() => setTrigger(false)}
      >
        <Modal.Header>Post a new announcement</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex flex-col">
              <div>
                <label className="sr-only">Title</label>
                <div className="relative w-full mb-4">
                  <input
                    autoComplete="off"
                    ref={inputRef}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <label className="sr-only">Announcement</label>
                <div className="relative w-full mb-4">
                  <textarea
                    autoComplete="off"
                    ref={inputRef}
                    type="text"
                    className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-21  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Announcement"
                    name="announcement"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <ButtonStyled className="save-btn" onClick={(e) => handleSubmit(e)}>
            Submit
          </ButtonStyled>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AnnouncementPopUp;
