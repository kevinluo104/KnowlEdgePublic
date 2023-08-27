import { TextField, Tabs, Tab } from '@mui/material';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Box, Popover, Select, MenuItem } from '@mui/material';
import TimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import {
  MobileDatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from '@mui/x-date-pickers';
import CloseIcon from '@material-ui/icons/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconButton } from '@mui/material';
import LocationIcon from '@material-ui/icons/LocationOn';
import NotesIcon from '@material-ui/icons/Notes';
import LinkIcon from '@material-ui/icons/Link';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsAsync, postEventAsync } from './redux/CalendarEventThunks';
import RepeatIcon from '@material-ui/icons/Repeat';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Visibility';
import PrivateIcon from '@mui/icons-material/VisibilityOff';

const PopoverContent = styled.div`
  margin: 2%;
  padding: 2%;
  width: 300px;

  font-family: Poppins;
  h4 {
    font-size: 18px;
    font-family: Poppins;
  }
  p {
    font-size: 12px;
    font-family: Poppins;
  }
  .popover-buttons {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    font-family: Poppins;
    background-color: #002145;
  }
`;

const AddEventModalStyled = styled('div')`
  font-family: Poppins;
  #event-title:focus,
  #datepicker:focus,
  #timepicker:focus,
  #datepicker:active,
  #timepicker:active {
    outline: none;
    box-shadow: none;
    z-index: 20;
    font-family: Poppins;
  }

  .MuiPopover-paper {
    padding: 2%;
    font-family: Poppins;
  }

  #addlink {
    display: flex;
    justify-self: flex-end;
    margin-left: 20%;
    margin-right: 2%;
    font-family: Poppins;
  }

  #event-title {
    margin: 2%;
    padding: 12px 8px;
    width: 100%;
    font-family: Poppins;
  }

  #event-time {
    margin: 2%;
    padding: 12px 8px;
    width: 100%;
    font-family: Poppins;
  }

  .icon-field {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: Poppins;
  }

  .css-sghohy-MuiButtonBase-root-MuiButton-root {
    background-color: #002145;
    color: white;
    padding: 10px;
    border-radius: 3px;
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    font-family: 'Poppins';
  }

  .css-1aquho2-MuiTabs-indicator {
    background-color: #002145;
  }

  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #002145;
  }

  .css-sghohy-MuiButtonBase-root-MuiButton-root {
    background-color: #002145;
    font-family: 'Poppins';
  }

  .css-sghohy-MuiButtonBase-root-MuiButton-root:hover {
    background-color: #003166;
  }

  #close-modal {
    position: absolute;
    top: 2%;
    right: 2%;
    font-family: Poppins;
  }
  #recurrence-inputs {
    display: flex;
    font-family: Poppins;
  }
  #frequency-input {
    width: 30%;
    font-family: Poppins;
  }
`;

const style = {
  position: 'absolute',
  margin: '1%',
  padding: '12px 8px',
  zIndex: 20,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  fontFamily: 'Poppins',
  p: 4,
};

// Radio button code adapted from https://mui.com/material-ui/react-radio-button/
// Textfield code adapted from https://mui.com/material-ui/react-text-field/

export default function AddEventModal({ isOpen, handleClose }) {
  const open = isOpen;
  const [eventTitle, setEventTitle] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [links, setLinks] = useState([{ name: '', url: '' }]);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedPublishedDate, setSelectedPublishedDate] = useState(
    new Date()
  );
  const [selectedPublishedTime, setSelectedPublishedTime] = useState(
    new Date()
  );
  const [selectedDeadlineDate, setSelectedDeadlineDate] = useState(new Date());
  const [selectedDeadlineTime, setSelectedDeadlineTime] = useState(new Date());
  const [eventCourse, setEventCourse] = useState('');
  const [taskCourse, setTaskCourse] = useState('');
  const [taskLocation, setTaskLocation] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasklinks, setTaskLinks] = useState([{ name: '', url: '' }]);
  const [frequency, setFrequency] = useState('');
  const [interval, setInterval] = useState('');
  const [endRecurrenceDate, setRecurrenceDate] = useState(new Date());
  const [recurrencePopover, setRecurrencePopover] = useState(false);
  const [visibility, setVisibility] = useState('private');

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.currentUser.uid);
  const isInstructor = useSelector(
    (state) => state.user.currentUser.instructor
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setRecurrencePopover(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setRecurrencePopover(false);
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  useEffect(() => {
    if (uid) {
      dispatch(getEventsAsync(uid));
    }
  }, [dispatch, uid]);

  const handleClickAddTask = () => {
    var newTask = {
      title: taskTitle,
      start: new Date(
        selectedDeadlineDate.getFullYear(),
        selectedDeadlineDate.getMonth(),
        selectedDeadlineDate.getDate(),
        selectedDeadlineTime.getHours(),
        selectedDeadlineTime.getMinutes()
      ).toISOString(),
      end: new Date(
        selectedDeadlineDate.getFullYear(),
        selectedDeadlineDate.getMonth(),
        selectedDeadlineDate.getDate(),
        selectedDeadlineTime.getHours(),
        selectedDeadlineTime.getMinutes()
      ).toISOString(),
      published: new Date(
        selectedPublishedDate.getFullYear(),
        selectedPublishedDate.getMonth(),
        selectedPublishedDate.getDate(),
        selectedPublishedTime.getHours(),
        selectedPublishedTime.getMinutes()
      ).toISOString(),
      deadline: new Date(
        selectedDeadlineDate.getFullYear(),
        selectedDeadlineDate.getMonth(),
        selectedDeadlineDate.getDate(),
        selectedDeadlineTime.getHours(),
        selectedDeadlineTime.getMinutes()
      ).toISOString(),
      course: taskCourse,
      completed: false,
      type: 'task',
      location: taskLocation,
      desc: taskDescription,
      links: tasklinks,
      published: visibility === 'public' ? true : false,
    };
    if (frequency && interval && endRecurrenceDate) {
      let recurrence = {
        frequency: frequency,
        interval: interval,
        endRecurrence: new Date(
          endRecurrenceDate.getFullYear(),
          endRecurrenceDate.getMonth(),
          endRecurrenceDate.getDate(),
          endRecurrenceDate.getHours(),
          endRecurrenceDate.getMinutes()
        ).toISOString(),
      };
      const taskWithRecurrence = { ...newTask, recurrence: recurrence };
      dispatch(postEventAsync({ uid: uid, event: taskWithRecurrence }));
    } else {
      dispatch(postEventAsync({ uid: uid, event: newTask }));
    }
  };

  const handleClickAddEvent = () => {
    var newEvent = {
      title: eventTitle,
      start: new Date(
        selectedStartDate.getFullYear(),
        selectedStartDate.getMonth(),
        selectedStartDate.getDate(),
        selectedStartTime.getHours(),
        selectedStartTime.getMinutes()
      ).toISOString(),
      end: new Date(
        selectedEndDate.getFullYear(),
        selectedEndDate.getMonth(),
        selectedEndDate.getDate(),
        selectedEndTime.getHours(),
        selectedEndTime.getMinutes()
      ).toISOString(),
      type: 'event',
      course: eventCourse,
      desc: eventDescription,
      location: location,
      links: links,
      completed: false,
      published: visibility === 'public' ? true : false,
    };

    if (frequency && interval && endRecurrenceDate) {
      let recurrence = {
        frequency: frequency,
        interval: interval,
        endRecurrence: new Date(
          endRecurrenceDate.getFullYear(),
          endRecurrenceDate.getMonth(),
          endRecurrenceDate.getDate(),
          endRecurrenceDate.getHours(),
          endRecurrenceDate.getMinutes()
        ).toISOString(),
      };
      const eventWithRecurrence = { ...newEvent, recurrence: recurrence };
      dispatch(postEventAsync({ uid: uid, event: eventWithRecurrence }));
    } else {
      dispatch(postEventAsync({ uid: uid, event: newEvent }));
    }
  };

  const handleTaskTitleChange = (event) => {
    const inputValue = event.target.value;
    setTaskTitle(inputValue);
  };

  const handleTaskPublishedDateChange = (date) => {
    setSelectedPublishedDate(date);
  };

  const handleTaskPublishedTimeChange = (time) => {
    setSelectedPublishedTime(time);
  };

  const handleTaskDeadlineDateChange = (date) => {
    setSelectedDeadlineDate(date);
  };

  const handleTaskDeadlineTimeChange = (time) => {
    setSelectedDeadlineTime(time);
  };

  const handleTaskCourseChange = (event) => {
    const inputValue = event.target.value;
    setTaskCourse(inputValue);
  };

  const handleTaskDescriptionChange = (description) => {
    const inputValue = description.target.value;
    setTaskDescription(inputValue);
  };

  const handleTaskLocationChange = (event) => {
    const inputValue = event.target.value;
    setTaskLocation(inputValue);
  };

  const handleTaskLinksChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setTaskLinks(newLinks);
  };

  const handleEventTitleChange = (event) => {
    const inputValue = event.target.value;
    setEventTitle(inputValue);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEventCourseChange = (event) => {
    const inputValue = event.target.value;
    setEventCourse(inputValue);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const handleLocationChange = (location) => {
    const locationValue = location.target.value;
    setLocation(locationValue);
  };

  const handleEventDescriptionChange = (description) => {
    const descriptionValue = description.target.value;
    setEventDescription(descriptionValue);
  };

  const handleAddLink = () => {
    const newLinks = [...links, {}];
    setLinks(newLinks);
  };

  const handleDeleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleRecurrenceEndChange = (date) => {
    setRecurrenceDate(date);
  };

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  return (
    <div>
      <AddEventModalStyled
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={[
            style,
            {
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            },
          ]}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Event" />
            <Tab label="Task" />
          </Tabs>

          {value === 0 && (
            <div value={value} index={0}>
              <IconButton id="close-modal" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <div className="icon-field">
                <EventIcon />
                <TextField
                  id="event-title"
                  value={eventTitle}
                  onChange={handleEventTitleChange}
                  variant="standard"
                  placeholder="Add title"
                />
              </div>
              <div className="icon-field">
                <BookIcon />
                <TextField
                  id="event-title"
                  value={eventCourse}
                  onChange={handleEventCourseChange}
                  variant="standard"
                  placeholder="Add Course"
                />
              </div>
              <div className="icon-field">
                <TimeIcon />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    label="Start Date"
                    renderInput={(props) => (
                      <TextField
                        id="datepicker"
                        {...props}
                        helperText="valid mask"
                        variant="standard"
                      />
                    )}
                  />
                  <MobileTimePicker
                    label="Start Time"
                    value={selectedStartTime}
                    onChange={handleStartTimeChange}
                    renderInput={(props) => (
                      <TextField
                        id="timepicker"
                        {...props}
                        helperText="valid mask"
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="icon-field">
                <TimeIcon />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="End Date"
                    onChange={handleEndDateChange}
                    value={selectedEndDate}
                    renderInput={(props) => (
                      <TextField
                        id="datepicker"
                        {...props}
                        helperText="valid mask"
                        variant="standard"
                      />
                    )}
                  />
                  <MobileTimePicker
                    label="End Time"
                    onChange={handleEndTimeChange}
                    value={selectedEndTime}
                    renderInput={(props) => (
                      <TextField
                        id="timepicker"
                        {...props}
                        helperText="valid mask"
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="icon-field">
                <RepeatIcon />
                <TextField
                  id="event-title"
                  inputProps={{ readOnly: true }}
                  value={
                    frequency && interval && endRecurrenceDate
                      ? `every ${interval} ${frequency}`
                      : 'Does not repeat'
                  }
                  variant="standard"
                  placeholder="Add location"
                />
                <IconButton onClick={handleClick}>
                  <EditIcon />
                </IconButton>
                {recurrencePopover && (
                  <Popover
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <PopoverContent>
                      Recurrence
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '2%',
                          right: '2%',
                        }}
                        onClick={handleClosePopover}
                      >
                        <CloseIcon />
                      </IconButton>
                      <div id="recurrence-inputs">
                        Repeat every{' '}
                        <TextField
                          id="number-input"
                          onChange={handleIntervalChange}
                          value={interval}
                          placeholder={'1'}
                          sx={{ margin: '2%', width: '50px' }}
                        />
                        <Select
                          onChange={handleFrequencyChange}
                          displayEmpty
                          value={frequency}
                          sx={{ margin: '2%', width: '100px' }}
                        >
                          <MenuItem value={''}>frequency</MenuItem>
                          <MenuItem value={'days'}>days</MenuItem>
                          <MenuItem value={'weeks'}>weeks</MenuItem>
                          <MenuItem value={'months'}>months</MenuItem>
                        </Select>
                      </div>
                      <div className="icon-field">
                        until{' '}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            value={endRecurrenceDate}
                            onChange={handleRecurrenceEndChange}
                            label="End Date"
                            renderInput={(props) => (
                              <TextField
                                id="datepicker"
                                {...props}
                                helperText="valid mask"
                                variant="standard"
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>

              <div className="icon-field">
                <LocationIcon />
                <TextField
                  id="event-title"
                  value={location}
                  onChange={handleLocationChange}
                  variant="standard"
                  placeholder="Add location"
                />
              </div>
              {isInstructor && isInstructor === true && (
                <div className="icon-field">
                  {visibility === 'public' ? <PublicIcon /> : <PrivateIcon />}
                  <Select
                    onChange={handleVisibilityChange}
                    value={visibility}
                    defaultValue={visibility}
                    sx={{ margin: '2%', width: '100px' }}
                  >
                    <MenuItem value={'private'}>private</MenuItem>
                    <MenuItem value={'public'}>public</MenuItem>
                  </Select>
                </div>
              )}
              <div className="icon-field">
                <NotesIcon />
                <TextField
                  id="event-title"
                  value={eventDescription}
                  onChange={handleEventDescriptionChange}
                  multiline
                  maxRows={5}
                  placeholder="Add description"
                />
              </div>

              {links.map((link, index) => (
                <div className="icon-field" key={index}>
                  <LinkIcon />
                  <TextField
                    value={link.name}
                    name="name"
                    onChange={(event) => handleLinkChange(index, event)}
                    variant="outlined"
                    label={`Link ${index + 1} Name`}
                    placeholder="Add link name"
                  />
                  <TextField
                    value={link.url}
                    name="url"
                    onChange={(event) => handleLinkChange(index, event)}
                    variant="outlined"
                    label={`Link ${index + 1} URL`}
                    placeholder="Add link url"
                  />
                  <CloseIcon onClick={(event) => handleDeleteLink(index)} />
                </div>
              ))}
              <div className="icon-field">
                <Button
                  id="addlink"
                  variant="contained"
                  onClick={handleAddLink}
                >
                  Add Link
                </Button>
                <Button
                  id="createevent"
                  variant="contained"
                  type="submit"
                  onClick={handleClickAddEvent}
                >
                  Create Event
                </Button>
              </div>
            </div>
          )}
          {value === 1 && (
            <div>
              <div value={value} index={1}>
                <IconButton id="close-modal" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <div className="icon-field">
                  <EventIcon />
                  <TextField
                    id="event-title"
                    value={taskTitle}
                    onChange={handleTaskTitleChange}
                    variant="standard"
                    placeholder="Add title"
                  />
                </div>
                <div className="icon-field">
                  <BookIcon />
                  <TextField
                    id="event-title"
                    value={taskCourse}
                    onChange={handleTaskCourseChange}
                    variant="standard"
                    placeholder="Add Course"
                  />
                </div>
                <div className="icon-field">
                  <TimeIcon />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      value={selectedStartDate}
                      onChange={handleTaskPublishedDateChange}
                      label="Published Date"
                      renderInput={(props) => (
                        <TextField
                          id="datepicker"
                          {...props}
                          helperText="valid mask"
                          variant="standard"
                        />
                      )}
                    />
                    <MobileTimePicker
                      label="Published Time"
                      value={selectedStartTime}
                      onChange={handleTaskPublishedTimeChange}
                      renderInput={(props) => (
                        <TextField
                          id="timepicker"
                          {...props}
                          helperText="valid mask"
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="icon-field">
                  <TimeIcon />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      label="Deadline Date"
                      onChange={handleTaskDeadlineDateChange}
                      value={selectedEndDate}
                      renderInput={(props) => (
                        <TextField
                          id="datepicker"
                          {...props}
                          helperText="valid mask"
                          variant="standard"
                        />
                      )}
                    />
                    <MobileTimePicker
                      label="Deadline Time"
                      onChange={handleTaskDeadlineTimeChange}
                      value={selectedEndTime}
                      renderInput={(props) => (
                        <TextField
                          id="timepicker"
                          {...props}
                          helperText="valid mask"
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="icon-field">
                  <RepeatIcon />
                  <TextField
                    id="event-title"
                    inputProps={{ readOnly: true }}
                    value={
                      frequency && interval && endRecurrenceDate
                        ? `every ${interval} ${frequency}`
                        : 'Does not repeat'
                    }
                    variant="standard"
                    placeholder="Add location"
                  />
                  <IconButton onClick={handleClick}>
                    <EditIcon />
                  </IconButton>
                  {recurrencePopover && (
                    <Popover
                      open={popoverOpen}
                      anchorEl={anchorEl}
                      onClose={handleClosePopover}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <PopoverContent>
                        Recurrence
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: '2%',
                            right: '2%',
                          }}
                          onClick={handleClosePopover}
                        >
                          <CloseIcon />
                        </IconButton>
                        <div id="recurrence-inputs">
                          Repeat every{' '}
                          <TextField
                            id="number-input"
                            onChange={handleIntervalChange}
                            value={interval}
                            placeholder={'1'}
                            sx={{ margin: '2%', width: '50px' }}
                          />
                          <Select
                            onChange={handleFrequencyChange}
                            displayEmpty
                            value={frequency}
                            sx={{ margin: '2%', width: '100px' }}
                          >
                            <MenuItem value={''}>frequency</MenuItem>
                            <MenuItem value={'days'}>days</MenuItem>
                            <MenuItem value={'weeks'}>weeks</MenuItem>
                            <MenuItem value={'months'}>months</MenuItem>
                          </Select>
                        </div>
                        <div className="icon-field">
                          until{' '}
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              value={endRecurrenceDate}
                              onChange={handleRecurrenceEndChange}
                              label="End Date"
                              renderInput={(props) => (
                                <TextField
                                  id="datepicker"
                                  {...props}
                                  helperText="valid mask"
                                  variant="standard"
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <div className="icon-field">
                  <LocationIcon />
                  <TextField
                    id="event-title"
                    value={taskLocation}
                    onChange={handleTaskLocationChange}
                    variant="standard"
                    placeholder="Add location"
                  />
                </div>
                {isInstructor && isInstructor === true && (
                  <div className="icon-field">
                    {visibility === 'public' ? <PublicIcon /> : <PrivateIcon />}
                    <Select
                      onChange={handleVisibilityChange}
                      value={visibility}
                      defaultValue={visibility}
                      sx={{ margin: '2%', width: '100px' }}
                    >
                      <MenuItem value={'private'}>private</MenuItem>
                      <MenuItem value={'public'}>public</MenuItem>
                    </Select>
                  </div>
                )}
                <div className="icon-field">
                  <NotesIcon />
                  <TextField
                    id="event-title"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    multiline
                    maxRows={5}
                    placeholder="Add description"
                  />
                </div>
                {links.map((link, index) => (
                  <div className="icon-field" key={index}>
                    <LinkIcon />
                    <TextField
                      value={link.name}
                      name="name"
                      onChange={(event) => handleTaskLinksChange(index, event)}
                      variant="outlined"
                      label={`Link ${index + 1} Name`}
                      placeholder="Add link name"
                    />
                    <TextField
                      value={link.url}
                      name="url"
                      onChange={(event) => handleTaskLinksChange(index, event)}
                      variant="outlined"
                      label={`Link ${index + 1} URL`}
                      placeholder="Add link url"
                    />
                    <CloseIcon onClick={(event) => handleDeleteLink(index)} />
                  </div>
                ))}
                <div className="icon-field">
                  <Button
                    id="addlink"
                    variant="contained"
                    onClick={handleAddLink}
                  >
                    Add Link
                  </Button>
                  <Button
                    id="createevent"
                    variant="contained"
                    type="submit"
                    onClick={handleClickAddTask}
                  >
                    Create Task
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </AddEventModalStyled>
    </div>
  );
}
