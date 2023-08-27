import { styled } from 'styled-components';
import CardGeneric from './CardGeneric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faClock, faBell } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEventsAsync } from '../Calendar-Page-Folder/redux/CalendarEventThunks';
import { getAnnouncementsAsync } from '../Announcement-Page-Folder/redux/thunks';

const CardStyled = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
  height: 100%;

  &:hover {
    cursor: default;
    color: #002145;
  }

  .flex {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .flex-col {
    flex-direction: column;
  }

  .margin-right-15 {
    margin-right: 15px;
  }

  .breakline {
    margin: 20px 0;
    border-top: 1px solid #a6a0a0;
  }

  .circle-icon {
    color: #33363f;
  }

  .small-container {
    padding-left: 8px;
    margin-bottom: 30px;
  }

  .icon-wrapper {
    width: 25px;
  }

  ul {
    padding-left: 40px;
  }

  .start-course-btn {
    margin-top: 10px;
    padding: 5px 20px;
    background-color: #002145;
    color: #fff;
    float: right;
    border-radius: 7px;
    font-weight: 600;
    width: fit-content;
    align-self: end;
  }

  .start-course-btn:hover {
    background-color: #003366;
  }

  h2 {
    flex: 2;
    text-align: left;
    font-weight: bold;
  }

  h2:hover {
    cursor: pointer;
    color: #b2bcc7;
  }

  .icon {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #002145;
    color: #fff;
    margin-right: 15px;
  }

  .high-level-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CourseCard = CardGeneric(({ title, onclickfn }) => {
  const goToCourse = () => {
    const [courseCode] = title.split(' - ');
    const titleSlug = courseCode.toLowerCase().replace(/\s+/g, '-');
    onclickfn(titleSlug);
  };

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.user.currentUser.uid);
  const events = useSelector((state) => state.event.events);
  const courseEvents = events.filter(
    (e) =>
      e.published === true &&
      e.course ===
        (title.split(' ')[0] + ' ' + title.split(' ')[1]).toUpperCase()
  );
  const todaysEvents = courseEvents.filter(
    (e) => new Date(e.start).getDate() === new Date().getDate()
  );
  const sortedEvents = todaysEvents.sort(
    (a, b) => new Date(a.end) - new Date(b.end)
  );

  const allAnnouncements = useSelector(
    (state) => state.announcementPageReducerStore.announcements
  );

  const courseAnnouncements = allAnnouncements.filter(
    (announcement) =>
      announcement.announcementCourse ===
      (title.split(' ')[0] + '-' + title.split(' ')[1]).toLowerCase()
  );

  useEffect(() => {
    if (uid) {
      dispatch(getEventsAsync(uid));
      dispatch(
        getAnnouncementsAsync({
          uid: uid,
          course: 'all',
        })
      );
    }
  }, [dispatch, uid]);

  return (
    <CardStyled>
      <div className="high-level-wrapper">
        <div>
          <div className="flex">
            <span className="icon">
              <FontAwesomeIcon icon={faClipboardList} size="lg" />
            </span>
            <h2 onClick={goToCourse}>{title}</h2>
          </div>
          <div className="breakline"></div>

          <div className="flex flex-col small-container">
            <div className="flex">
              <FontAwesomeIcon
                className="margin-right-15 icon-wrapper"
                icon={faClock}
              />
              <h3>Today</h3>
            </div>
            <ul className="flex flex-col">
              {sortedEvents.length === 0 && (
                <span className="flex">
                  <li>Nothing due today</li>
                </span>
              )}
              {sortedEvents &&
                sortedEvents.map((event) => (
                  <span key={event._id} className="flex">
                    <FontAwesomeIcon
                      className="margin-right-15 circle-icon"
                      icon={faCircle}
                      size="2xs"
                    />
                    <li>
                      {event.title}{' '}
                      {new Date(event.start).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </li>
                  </span>
                ))}
            </ul>
          </div>

          <div className="flex flex-col small-container">
            <div className="flex">
              <FontAwesomeIcon
                className="margin-right-15 icon-wrapper"
                icon={faBell}
              />
              <h3>Recent</h3>
            </div>
            <ul className="flex flex flex-col">
              {courseAnnouncements && courseAnnouncements.length === 0 && (
                <span className="flex">
                  <li>No new announcements</li>
                </span>
              )}
              {courseAnnouncements &&
                courseAnnouncements.map((announcement) => (
                  <span key={announcement._id} className="flex">
                    <FontAwesomeIcon
                      className="margin-right-15 circle-icon"
                      icon={faCircle}
                      size="2xs"
                    />
                    <li>{announcement.announcementTitle}</li>
                  </span>
                ))}
            </ul>
          </div>
        </div>
        <button onClick={goToCourse} className="start-course-btn">
          Start
        </button>
      </div>
    </CardStyled>
  );
});

export default CourseCard;
