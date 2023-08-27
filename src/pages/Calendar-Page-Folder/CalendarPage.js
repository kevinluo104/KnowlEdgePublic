import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { styled } from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { PropTypes } from 'prop-types';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import EditEventModal from './EditCalendarModal';
import { deleteEventAsync } from './redux/CalendarEventThunks';
import EditTaskModal from './EditTaskModal';
import { ListItem, ListItemText } from '@mui/material';

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};

const propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

const localizer = momentLocalizer(moment);

/* styling was adapted from Google Calendar CSS using DevTools */

const SearchBarListStyled = styled.div`
  li {
    font-family: 'Poppins';
  }
`;

const CalendarStyled = styled.div`
  font-family: 'Poppins';

  .calendarComponent {
    margin-top: 5%;
    margin-left: 5%;
    width: 80vw;
  }

  .rbc-toolbar button {
    border: none;
    border-radius: 0;
  }

  .rbc-event .rbc-selected {
    border: none;
    color: #0021450f;
  }

  .rbc-today {
    background-color: #0021450f;
  }

  .rbc-btn-group {
    border: none;
    font-family: 'Poppins', sans-serif;
  }

  .rbc-header {
    border-bottom: none;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 500;
    line-height: 20px;
  }

  .rbc-searchbar {
    margin-right: 2%;
    width: 40vw;
    font-family: 'Poppins';
  }

  .rbc-toolbar .rbc-toolbar-label {
    text-align: left;
  }

  .MuiInputBase-input {
    font-family: 'Poppins';
  }

  .MuiInputBase-input:focus {
    box-shadow: none;
    font-family: 'Poppins';
  }

  .rbc-date-cell {
    text-align: center;
    white-space: nowrap;
    width: max-content;
    min-width: 24px;
    font-size: 12px;
    margin-top: 8px;
    display: inline-block;
    line-height: 16px;
    pointer-events: auto;
  }

  .rbc-event,
  .rbc-day-slot .rbc-background-event {
    border: none;
    box-sizing: border-box;
    box-shadow: none;
    margin: 0;
    padding: 2px 5px;
    border-radius: 5px;
    background-color: transparent;
    color: #000;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  .rbc-event-content {
    font-size: 12px;
  }

  .rbc-off-range-bg {
    background: transparent;
  }

  .rbc-calendar {
  }

  .modal-show {
    display: block;
  }

  .modal-hide {
    display: none;
  }

  .MuiAutocomplete-option {
    font-family: 'Poppins';
  }

  .MuiAutocomplete-groupLabel,
  .MuiAutocomplete-groupUl {
    font-family: 'Poppins';
  }

  .calendarContainer {
    position: relative;
  }

  .popover-text {
    margin: 12px 8px;
  }
`;

const PopoverContent = styled.div`
  margin: 2%;
  padding: 2%;
  width: 300px;

  font-family: 'Poppins';
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

/* Adapted code from https://stackoverflow.com/questions/54597239/importing-custom-toolbar-component-doesnt-fire-methods-in-react-big-calendar 
 and https://github.com/jquense/react-big-calendar/issues/191 to make a custom toolbar for the react-big-calendar module. The form elements
 are primarily pre-made mui components.*/

class CustomToolbar extends React.Component {
  static propTypes = propTypes;
  constructor(props) {
    super(props);
    this.state = {
      view: 'month',
      query: '',
      events: props.events,
    };
  }

  handleEventSearch = (event, value) => {
    var id = String(value._id);

    var newSelectedEvent = this.state.events.filter(
      (event) => event._id === id
    );
    this.setState({ selectedEvent: newSelectedEvent });
    const date = new Date(newSelectedEvent[0].start);
    this.props.date.setDate(date.getDate());
    this.props.date.setMonth(date.getMonth());
    this.props.date.setFullYear(date.getFullYear());
    this.props.onNavigate(date);
  };
  handleChange = (event) => {
    this.setState({ view: event.target.value });
    this.props.onView(event.target.value);
  };

  render() {
    let { label } = this.props;
    const { view } = this.state;

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            Today
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            <ChevronRightIcon />
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-searchbar">
          <Autocomplete
            clearIcon=""
            disableClearable
            popupIcon={<SearchIcon size="medium" />}
            sx={{
              [`& .${autocompleteClasses.popupIndicator}`]: {
                transform: 'none',
                backgroundColor: 'white',
              },
              [`& .${autocompleteClasses.listbox}`]: {
                fontFamily: 'Poppins',
              },
            }}
            onChange={this.handleEventSearch}
            options={this.state.events}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <SearchBarListStyled
                key={
                  option.parent ? String(option.pseudo_id) : String(option._id)
                }
              >
                <ListItem key={String(option._id)} {...props}>
                  {option.title}
                </ListItem>
              </SearchBarListStyled>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find Event"
                InputLabelProps={{ style: { fontFamily: 'Poppins' } }}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  style: { fontFamily: 'Poppins' },
                }}
              />
            )}
          />
        </span>
        <span className="rbc-btn-group">
          <FormControl>
            <InputLabel id="demo-simple-select-label">view</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={view}
              label="view"
              style={{ fontFamily: 'Poppins' }}
              onChange={this.handleChange}
            >
              <MenuItem sx={{ fontFamily: 'Poppins' }} value={'day'}>
                Day
              </MenuItem>
              <MenuItem sx={{ fontFamily: 'Poppins' }} value={'week'}>
                Week
              </MenuItem>
              <MenuItem sx={{ fontFamily: 'Poppins' }} value={'month'}>
                Month
              </MenuItem>
            </Select>
          </FormControl>
        </span>
      </div>
    );
  }
  navigate = (action) => {
    this.props.onNavigate(action);
  };
}

const eventStyleGetter = (event, start, end, isSelected) => {
  // If the event is selected, return a style object without the 'borderRadius' property
  if (isSelected) {
    return { style: { borderRadius: 0 } };
  }
  return {};
};

export default function CalendarPage({ events, components }) {
  const [day, setDay] = useState(new Date()); // Initial day
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editEventModal, setEditEventModal] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.currentUser.uid);
  const user = useSelector((state) => state.user.currentUser);

  const handleCloseEditEventModal = () => {
    setEditEventModal(false);
  };

  const handleNavigate = (date) => {
    setDay(date);
  };

  /* code for handleEventClick() and the eventPopover was adapted from ChatGPT prompts on how to add event popovers to react-big-calendar events*/
  const handleEventClick = (event, e) => {
    setSelectedEvent(event);
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
    setAnchorEl(null);
  };

  const handleDeleteEvent = () => {
    var eventid = selectedEvent.parent
      ? selectedEvent.parent
      : selectedEvent._id;
    setSelectedEvent(null);
    setAnchorEl(null);
    dispatch(deleteEventAsync({ uid: uid, eventId: eventid }));
  };

  const handleClickUpdateEvent = () => {
    setEditEventModal(true);
  };

  const open = Boolean(anchorEl);

  const eventPopover = (
    <Popover
      open={open && selectedEvent !== null}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <PopoverContent selected={selectedEvent}>
        <div className="popover-buttons">
          {selectedEvent?.uid === uid && (
            <IconButton size="small" onClick={handleClickUpdateEvent}>
              <EditIcon />
            </IconButton>
          )}
          {selectedEvent?.uid === uid && (
            <IconButton size="small" onClick={handleDeleteEvent}>
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton size="small">
            <EmailIcon />
          </IconButton>
          <IconButton size="small" onClick={handleClosePopover}>
            <CloseIcon />
          </IconButton>
        </div>
        <h4>{selectedEvent?.title}</h4>
        <p>{selectedEvent?.desc}</p>
        {selectedEvent?.type === 'event' && (
          <p>Start: {selectedEvent?.start.toLocaleString()}</p>
        )}
        {selectedEvent?.type === 'event' && (
          <p>End: {selectedEvent?.end.toLocaleString()}</p>
        )}
        {selectedEvent?.type === 'task' && (
          <p>Published: {selectedEvent?.published.toLocaleString()}</p>
        )}
        {selectedEvent?.type === 'task' && (
          <p>Deadline: {selectedEvent?.deadline.toLocaleString()}</p>
        )}
        {selectedEvent?.location && <p>Location: {selectedEvent?.location}</p>}
        {selectedEvent?.links && (
          <ul>
            {selectedEvent?.links &&
              selectedEvent?.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );

  return (
    <CalendarStyled>
      <div className="calendarComponent">
        <Calendar
          setDay={setDay}
          localizer={localizer}
          events={events}
          eventPropGetter={eventStyleGetter}
          startAccessor={(event) => moment.utc(event.start).toDate()}
          endAccessor={(event) => moment.utc(event.end).toDate()}
          style={{ height: '80vh' }}
          components={{
            event: components.event,
            toolbar: (toolbarProps) => (
              <CustomToolbar {...toolbarProps} events={events} />
            ),
          }}
          date={day}
          onNavigate={handleNavigate}
          onSelectEvent={(event, e) => handleEventClick(event, e)}
        />
        {selectedEvent && selectedEvent !== null && !editEventModal
          ? eventPopover
          : undefined}
        {editEventModal && selectedEvent && selectedEvent.type === 'event' ? (
          <EditEventModal
            open={true}
            event={selectedEvent}
            handleClose={handleCloseEditEventModal}
            updateParentEvent={setSelectedEvent}
          />
        ) : undefined}
        {editEventModal && selectedEvent && selectedEvent.type === 'task' && (
          <EditTaskModal
            open={true}
            event={selectedEvent}
            handleClose={handleCloseEditEventModal}
            updateParentEvent={setSelectedEvent}
          />
        )}
      </div>
    </CalendarStyled>
  );
}
