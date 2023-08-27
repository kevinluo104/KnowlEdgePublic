import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsisVertical,
  faMaximize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PanelGeneric from './Components/PanelGeneric';
import { SCREENS } from './redux/ChatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setScreen, setViewPanel } from './redux/ChatSlice';
import { useEffect, useState } from 'react';
import {
  searchContact,
  returnChatID,
  searchChannels,
} from './redux/ChatService';
import { useNavigate } from 'react-router-dom';

const PanelStyled = styled(PanelGeneric)`
  background-color: #f0f4f8;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .heading-container {
    display: flex;
    align-items: center;
  }

  .heading {
    margin-left: 5px;
    font-size: medium;
    font-weight: 600;
  }

  .icons-container {
    display: flex;
    width: 60px;
    justify-content: space-around;
    align-items: center;
  }

  .break-line {
    padding: 0;
  }

  .sub-heading {
    margin: 10px 5px;
    font-weight: 600;
  }

  /* The following is adapted from ChatGPT */
  .contact-cards-container-wrapper {
    max-height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  .contact-cards-container {
    padding-bottom: 110px;
  }

  .icon {
    cursor: pointer;
  }
`;

const ContactCard = ({ name, image, onClick }) => {
  const ContactCardStyled = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;

    .image-container {
      border-radius: 50%;
      overflow: hidden;
      width: fit-content;
      display: flex;
      justify-content: center;
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }

    .content-container {
      flex: 1;
    }

    .name {
      font-size: medium;
      font-weight: 500;
    }

    &:hover {
      background-color: #003366;
      border-radius: 15px;
      color: #f5f5f5;
    }
  `;

  const [imageURL, setImageURL] = useState(image);
  return (
    <ContactCardStyled onClick={onClick}>
      <div className="image-container">
        <img
          src={imageURL}
          onError={() => {
            setImageURL('https://freesvg.org/img/abstract-user-flat-4.png');
          }}
        />
      </div>
      <div className="content-container">
        <h2 className="name">{name}</h2>
      </div>
    </ContactCardStyled>
  );
};

const SearchScreen = () => {
  const currentUser = useSelector((state) => state.user.currentUser.uid);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [peopleSearchResults, setPeopleSearchResults] = useState([]);
  const [channelsSearchResults, setChannelsSearchResults] = useState([]);
  const viewModeIsSmall = useSelector(
    (state) => state.ChatReducer.viewModeIsSmall
  );
  const dimensions = viewModeIsSmall ? { width: '350px', height: '400px' } : '';
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === '') return;
    const fetchData = async () => {
      try {
        const peopleResults = await searchContact(searchQuery);
        setPeopleSearchResults(peopleResults);

        const channelsResults = await searchChannels(searchQuery);

        setChannelsSearchResults(channelsResults);
      } catch (error) {
        console.error('Error searching for contacts:', error.message);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <PanelStyled style={{ width: dimensions.width, height: dimensions.height }}>
      <div className="header">
        <div
          className="heading-container"
          onClick={() => {
            dispatch(setScreen({ name: SCREENS.HOME }));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <h1 className="heading">Search</h1>
        </div>
        <div className="icons-container">
          {viewModeIsSmall && (
            <FontAwesomeIcon
              className="icon"
              icon={faMaximize}
              onClick={() => {
                navigate('/messages');
              }}
            />
          )}
          {viewModeIsSmall && (
            <FontAwesomeIcon
              className="icon"
              icon={faXmark}
              size="lg"
              onClick={() => {
                dispatch(setViewPanel(false));
              }}
            />
          )}
        </div>
      </div>
      <div className="break-line"></div>
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
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="contact-cards-container-wrapper">
        <div className="contact-cards-container">
          <div className="people-cards">
            {channelsSearchResults.length > 0 ? (
              <p className="sub-heading">Channels</p>
            ) : (
              ''
            )}
            {channelsSearchResults.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.name}
                image={contact.image}
                onClick={async () => {
                  dispatch(
                    setScreen({
                      name: SCREENS.CONVERSATION,
                      contactName: contact.name,
                      chatID: contact.id,
                      chatType: 'channel',
                      joined: contact.parties.includes(currentUser)
                        ? true
                        : false,
                    })
                  );
                }}
              />
            ))}
          </div>
          <div className="people-cards">
            {peopleSearchResults.length > 0 ? (
              <p className="sub-heading">People</p>
            ) : (
              ''
            )}
            {peopleSearchResults.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.preferredName}
                image={contact.image}
                onClick={async () => {
                  const id = await returnChatID([contact.uid, currentUser]);
                  dispatch(
                    setScreen({
                      name: SCREENS.CONVERSATION,
                      contactName: contact.preferredName,
                      chatID: id,
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </PanelStyled>
  );
};

export default SearchScreen;
