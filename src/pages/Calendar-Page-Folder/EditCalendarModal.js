import { TextField, Popover, Select, MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Box } from '@mui/material';
import TimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import BookIcon from '@material-ui/icons/Book';
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
import { getEventsAsync, putEventAsync } from './redux/CalendarEventThunks';
import RepeatIcon from '@material-ui/icons/Repeat';
import EditIcon from '@mui/icons-material/Edit';

const PopoverContent = styled.div`
  margin: 2%;
  padding: 2%;
  width: 300px;

  font-family: Poppins;
  h4 {
    font-size: 18px;
  }
  p {
    font-size: 12px;
  }
  .popover-buttons {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
  }
`;

const EditEventModalStyled = styled('div')`
  font-family: Poppins;
  #event-title:focus,
  #datepicker:focus,
  #timepicker:focus,
  #datepicker:active,
  #timepicker:active {
    outline: none;
    box-shadow: none;
    z-index: 20;
  }

  #addlink {
    display: flex;
    justify-self: flex-end;
    margin-left: 20%;
    margin-right: 2%;
  }

  #event-title {
    margin: 2%;
    padding: 12px 8px;
    width: 100%;
  }

  #event-time {
    margin: 2%;
    padding: 12px 8px;
    width: 100%;
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

  .icon-field {
    display: flex;
    align-items: center;
    width: 100%;
  }

  #close-modal {
    position: absolute;
    top: 2%;
    right: 2%;
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
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function EditEventModal({
  isOpen,
  handleClose,
  event,
  updateParentEvent,
}) {
  const open = isOpen;
  const [eventTitle, setEventTitle] = useState(event.title);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(event.start)
  );
  const [selectedStartTime, setSelectedStartTime] = useState(
    new Date(event.start)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(event.end));
  const [selectedEndTime, setSelectedEndTime] = useState(new Date(event.end));
  const [location, setLocation] = useState(event.location);
  const [eventDescription, setEventDescription] = useState(event.desc);
  const [links, setLinks] = useState(event.links);
  const [course, setCourse] = useState(event.course || '');
  const [frequency, setFrequency] = useState(
    event.recurrence?.frequency ? event.recurrence.frequency : ''
  );
  const [interval, setInterval] = useState(
    event.recurrence?.interval ? event.recurrence.interval : ''
  );
  const [endRecurrenceDate, setRecurrenceDate] = useState(
    event.recurrence?.endRecurrence || ''
  );
  const [recurrencePopover, setRecurrencePopover] = useState(false);
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

  const uid = useSelector((state) => state.user.currentUser.uid);
  const dispatch = useDispatch();

  const handleClickUpdateEvent = () => {
    var eventid = event.parent ? event.parent : event._id;
    var updatedEvent = {
      _id: eventid,
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
      desc: eventDescription,
      location: location,
      links: links,
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
      const eventWithRecurrence = { ...updatedEvent, recurrence: recurrence };
      dispatch(putEventAsync({ uid: uid, event: eventWithRecurrence }));
    } else {
      dispatch(putEventAsync({ uid: uid, event: updatedEvent }));
    }
    updateParentEvent(updatedEvent);
  };

  const handleCourseChange = (event) => {
    const inputValue = event.target.value;
    setCourse(inputValue);
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

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleRecurrenceEndChange = (date) => {
    setRecurrenceDate(date);
  };

  useEffect(() => {
    if (uid) {
      dispatch(getEventsAsync(uid));
    }
  }, [dispatch, uid]);

  return (
    <div>
      <EditEventModalStyled
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
              value={course}
              onChange={handleCourseChange}
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
          {links &&
            links.map((link, index) => (
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
            <Button id="addlink" variant="contained" onClick={handleAddLink}>
              Add Link
            </Button>
            <Button
              id="createevent"
              variant="contained"
              type="submit"
              onClick={handleClickUpdateEvent}
            >
              Update Event
            </Button>
          </div>
        </Box>
      </EditEventModalStyled>
    </div>
  );
}
