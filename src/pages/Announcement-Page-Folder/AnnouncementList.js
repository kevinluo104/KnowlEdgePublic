import React, { useState } from 'react';
import styled from 'styled-components';
// Search filter citation: https://www.youtube.com/watch?v=MY6ZZIn93V8&ab_channel=LamaDev
// Citation for drop down: https://www.w3schools.com/howto/howto_css_dropdown.asp
// learnt how to add and remove elements dynamically from Code Academy
// styling for dynamically elements inspired from codeacademy
// Styling also imported from Figma
// Drop down menu citation for CSS: https://www.w3schools.com/howto/howto_css_dropdown.asp
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
const StyledAnnouncementlist = styled.div`
  .announcement-list {
    padding: 5px 100px;
  }

  .announcementElement {
    background-color: white;
    padding: 25px;
    margin: 20px 0px;
    position: relative;
    background: #ffffff;
    box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.06);
    border-radius: 15px;
  }

  .paragraph {
    font-size: medium;
  }

  .announcementTitle {
    font-size: large;
    font-weight: 600;
  }

  .tempUser {
    font-size: small;
    margin-bottom: 25px;
  }

  .search-container {
    padding: 25px 100px;
  }

  .delete-btn {
    position: absolute;
    top: 20px;
    right: -30px;
    border: 1px solid #221824;
    border-radius: 5px;
    padding: 10px;
    width: 70px;
    font-size: medium;
    display: none;
  }

  .announcement-element-header {
    display: flex;
    justify-content: space-between;
  }

  .menu-container {
    display: flex;
    position: relative;
    float: right;
    margin-bottom: 5px;
    justify-content: right;
    flex-direction: row;
    width: 70px;
  }

  .menu-container:hover .delete-btn {
    display: block;
  }
`;

export default function AnnouncementList({
  allAnnouncements,
  handleDelete,
  studentCourses,
  studentUid,
  instructorBoolean
}) {
  const [query, setQuery] = useState('');

  return (
    <StyledAnnouncementlist>
      <div className={'fontuser'}>
        <div className="search-container">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              autoComplete="off"
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ul className={'announcement-list'}>
        {allAnnouncements
          .filter(
            (announcement) =>
              (announcement.announcementTitle.toLowerCase().includes(query) ||
                announcement.announcement.toLowerCase().includes(query)) &&
              studentCourses.includes(announcement.announcementCourse)
          )
          .map(
            ({ announcementTitle, announcement, announcementId, username, announcementStudentUid }) => (
              <li key={announcementId} className={'announcementElement'}>
                <div className="announcement-element-header">
                  <h1 className={'announcementTitle'}>{announcementTitle}</h1>
                  <div className="menu-container">
                    
                    {((studentUid === announcementStudentUid)|| instructorBoolean) && <button>
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        size="lg"
                      ></FontAwesomeIcon>
                    </button> }

                    {((studentUid === announcementStudentUid)|| instructorBoolean) && <button
                      onClick={() => handleDelete(announcementId)}
                      className="delete-btn"
                    >
                      Delete
                    </button> }
                  </div>
                </div>

                <p className={'tempUser'}>Posted by {username} </p>
                <p className={'paragraph'}>{announcement}</p>
              </li>
            )
          )}
      </ul>
    </StyledAnnouncementlist>
  );
}
