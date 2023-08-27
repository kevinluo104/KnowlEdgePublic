import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import AddCalendarIcon from '@mui/icons-material/Today';
import AddContactIcon from '@mui/icons-material/PermContactCalendar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarPage from './CalendarPage';
import AddEventModal from './AddEventModal';
import { useSelector, useDispatch } from 'react-redux';
import TaskIcon from '@mui/icons-material/TaskAltRounded';
import { useEffect } from 'react';
import { getEventsAsync } from './redux/CalendarEventThunks';
import { fetchStudentInfoAsync } from '../StudentDashboard/redux/thunks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { theme } from '@mui/material';
import { putEventAsync } from './redux/CalendarEventThunks';

/*sources*/
/* source:stackoverflow.com/questions/54332350/how-to-make-a-circle-checkbox-with-material-ui */

const drawerWidth = 240;

const TaskEvent = ({ event }) => {
  const bulletStyle = {
    display: 'inline-block',
    marginRight: '5px',
    verticalAlign: 'middle',
    borderRadius: '50%',
    width: '10px',
    height: '10px',
    backgroundColor: '#002145',
    fontFamily: 'Poppins',
  };

  const eventStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: event.type === 'task' ? 'transparent' : '#002145', // Set background color based on event type
    borderRadius: '5px',
    color: event.type === 'task' ? 'black' : 'white',
    padding: '5px',
    fontFamily: 'Poppins',
  };

  const completedTaskStyle = {
    textDecorationLine: 'line-through',
  };

  const iconStyle = {
    fontSize: '14px',
    marginLeft: '6px',
  };

  if (event.length > 1) {
    const remainingEvents = event.slice(1); // Get the remaining events excluding the first two
    return (
      <div>
        <div>{event[0].title}</div>
        <div>{event[1].title}</div>
        <div>
          <a href="#">{`+${remainingEvents.length} more`}</a>
        </div>
      </div>
    );
  }

  return (
    <div style={eventStyle}>
      {event.type === 'task' && !event.completed && (
        <span>
          <span style={bulletStyle}></span>
          {event.title}
        </span>
      )}
      {event.type === 'task' && event.completed && (
        <span style={completedTaskStyle}>
          <span style={bulletStyle}></span>
          {event.title}
        </span>
      )}
      {event.type === 'event' && event.title}
      {event.type === 'task' && (
        <TaskIcon fontSize="xsmall" style={iconStyle} />
      )}
    </div>
  );
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const RightDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 100,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
    '& .MuiDrawer-paperAnchorRight': {
      marginRight: 0,
      marginLeft: 'auto',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
    '& .MuiDrawer-paperAnchorRight': {
      marginRight: 0,
      marginLeft: 'auto',
    },
  }),
}));

export default function SideMenu() {
  const uid = useSelector((state) => state.user.currentUser.uid);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const myEventsList = useSelector((state) => state.event.events);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [taskItems, setTaskItems] = React.useState(null);
  const [finalEventsList, setFinalEventsList] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isAddEventModalOpen, setAddEventModal] = React.useState(false);
  const handleCloseAddEventModal = () => setAddEventModal(false);
  const studentInfo = useSelector(
    (state) => state.studentDashboardReducer.studentInfo
  );
  const studentCourses = studentInfo.courses;
  const updatedStudentCourses = new Set();
  studentCourses?.forEach((course) =>
    updatedStudentCourses.add(
      (course.split(' ')[0] + ' ' + course.split(' ')[1]).toUpperCase()
    )
  );

  const eventComponents = {
    event: TaskEvent, // Use TaskEvent component for task events
  };

  useEffect(() => {
    if (uid) {
      dispatch(getEventsAsync(uid));
      dispatch(fetchStudentInfoAsync(uid));
    }
  }, [dispatch, uid]);

  const generateRepeatedEvents = (event) => {
    const { recurrence, ...originalEvent } = event;
    const occurrences = [];
    const currentDate = new Date(event.start); // Convert the start date to a Date object
    let timeDifference;
    if (event.type === 'event') {
      const endTime = new Date(event.end);
      timeDifference = endTime.getTime() - currentDate.getTime();
    }

    if (recurrence && recurrence.interval && recurrence.endRecurrence) {
      const endRecurrence = new Date(recurrence.endRecurrence); // Convert endRecurrence to a Date object
      const completedSet = new Set(
        recurrence.completedInstances.map((dateStr) =>
          new Date(dateStr).getTime()
        )
      );
      let intervalIncrement;
      switch (recurrence.frequency) {
        case 'days':
          intervalIncrement = recurrence.interval;
          break;
        case 'weeks':
          intervalIncrement = 7 * recurrence.interval;
          break;
        case 'months':
          intervalIncrement = recurrence.interval;
          break;
        // Add more cases for other recurrence frequencies (e.g., yearly)
        default:
          intervalIncrement = 1;
          break;
      }

      // Calculate the occurrences based on the recurrence rule using a for loop
      for (
        let current = new Date(currentDate);
        current.getTime() <= endRecurrence.getTime();
        current.setDate(current.getDate() + intervalIncrement)
      ) {
        if (event.type === 'event') {
          if (completedSet.has(current.getTime())) {
            occurrences.push({
              completed: true,
              ...originalEvent,
              parent: originalEvent._id,
              parentEvent: event,
              _id: String(originalEvent._id) + current,
              start: new Date(current),
              end: new Date(current.getTime() + timeDifference),
              due: new Date(current.getTime() + timeDifference),
              recurrence: {
                interval: recurrence.interval,
                frequency: recurrence.frequency,
                endRecurrence: endRecurrence,
                completedInstances: recurrence.completedInstances,
              },
            });
          } else {
            occurrences.push({
              ...originalEvent,
              completed: false,
              parent: originalEvent._id,
              parentEvent: event,
              _id: String(originalEvent._id) + current,
              start: new Date(current),
              end: new Date(current.getTime() + timeDifference),
              due: new Date(current.getTime() + timeDifference),

              recurrence: {
                interval: recurrence.interval,
                frequency: recurrence.frequency,
                endRecurrence: endRecurrence,
                completedInstances: recurrence.completedInstances,
                recurrence: {
                  interval: recurrence.interval,
                  frequency: recurrence.frequency,
                  endRecurrence: endRecurrence,
                  completedInstances: recurrence.completedInstances,
                },
              },
            });
          }
        } else {
          if (completedSet.has(current.getTime())) {
            occurrences.push({
              ...originalEvent,
              start: new Date(current),
              end: new Date(current),
              due: new Date(current.getTime() + timeDifference),
              allDay: true,
              deadline: new Date(current),
              parentEvent: event,
              parent: originalEvent._id,
              _id: String(originalEvent._id) + current,
              completed: true,
              recurrence: {
                interval: recurrence.interval,
                frequency: recurrence.frequency,
                endRecurrence: endRecurrence,
                completedInstances: recurrence.completedInstances,
              },
            });
          } else {
            occurrences.push({
              ...originalEvent,
              start: new Date(current),
              end: new Date(current),
              due: new Date(current.getTime() + timeDifference),
              parentEvent: event,
              allDay: true,
              deadline: new Date(current),
              parent: originalEvent._id,
              _id: String(originalEvent._id) + current,
              completed: false,
              recurrence: {
                interval: recurrence.interval,
                frequency: recurrence.frequency,
                endRecurrence: endRecurrence,
                completedInstances: recurrence.completedInstances,
              },
            });
          }
        }
      }
      return occurrences;
    } else {
      return event;
    }
  };

  useEffect(() => {
    if (myEventsList && studentInfo && user) {
      let tasks = [];
      let events = [];

      if (!user.instructor || user.instructor === false) {
        tasks = myEventsList.filter(
          (event) =>
            updatedStudentCourses.has(event.course) && event.type === 'task'
        );
        events = myEventsList.filter(
          (event) =>
            updatedStudentCourses.has(event.course) && event.type === 'event'
        );
      } else {
        tasks = myEventsList.filter((event) => event.type === 'task');
        events = myEventsList.filter((event) => event.type === 'event');
      }

      const taskEvents = tasks.map((task) => ({
        _id: task._id,
        title: task.title,
        uid: task.uid,
        course: task.course,
        published: task.published,
        completed: task.completed,
        allDay: true,
        start: task.deadline,
        end: task.deadline,
        deadline: task.deadline,
        recurrence: task.recurrence,
        desc: task.desc,
        links: task.links,
        type: task.type,
      }));

      let totalEvents;
      let totalTasks;

      if (events.length > 0) {
        totalEvents = events.flatMap((event) => generateRepeatedEvents(event));
      } else {
        totalEvents = [];
      }

      if (taskEvents.length > 0) {
        totalTasks = taskEvents.flatMap((task) => generateRepeatedEvents(task));
      } else {
        totalTasks = [];
      }

      if (totalEvents && totalTasks) {
        const finalEventsList = [...totalEvents, ...totalTasks];
        setFinalEventsList(finalEventsList);
        const newTaskItems = totalTasks.map((taskEvent) => ({
          id: taskEvent._id,
          content: taskEvent.title,
          due: taskEvent.deadline,
          completed: taskEvent.completed,
          parent: taskEvent.parent,
        }));
        setTaskItems(newTaskItems);
      }
    }
  }, [myEventsList]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(taskItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTaskItems(items);
  };

  const handleToggleRightDrawer = () => {
    setRightOpen(!rightOpen);
  };

  // Need to map tasks to fit the big-react-calendar events, model them as all they events so that they can be displayed

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleClickAddEvents = () => {
    setAddEventModal(true);
  };
  const handleToggleComplete = (item, event) => {
    // Create new arrays with updated completed property
    const updatedFinalEventsList = finalEventsList.map((e) =>
      e._id === item.id ? { ...e, completed: !e.completed } : e
    );

    const updatedTaskItems = taskItems.map((task) =>
      task.id === item.id ? { ...task, completed: !task.completed } : task
    );

    setFinalEventsList(updatedFinalEventsList);
    setTaskItems(updatedTaskItems);

    if (item.parent) {
      const instance = updatedFinalEventsList.find((e) => e._id === item.id);
      const parentEvent = instance.parentEvent;

      if (parentEvent?.recurrence) {
        const completedInstances = [
          ...parentEvent.recurrence.completedInstances,
        ];
        const instanceIndex = completedInstances.indexOf(String(item.due));
        if (instanceIndex !== -1) {
          completedInstances.splice(instanceIndex, 1);
        } else {
          completedInstances.push(String(item.due));
        }

        const newParentEvent = {
          ...parentEvent,
          recurrence: {
            ...parentEvent.recurrence,
            completedInstances,
          },
        };

        dispatch(putEventAsync({ uid: uid, event: newParentEvent }));
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <Drawer id="left-drawer" anchor="left" variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer}>
            {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Create', 'Add Calendar', 'Contacts', 'Notifications'].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={index === 0 ? handleClickAddEvents : undefined}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 ? (
                      <AddIcon />
                    ) : index === 1 ? (
                      <AddCalendarIcon />
                    ) : index === 2 ? (
                      <AddContactIcon />
                    ) : (
                      <NotificationsIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      {myEventsList && finalEventsList !== null && (
        <CalendarPage events={finalEventsList} components={eventComponents} />
      )}
      {isAddEventModalOpen && (
        <AddEventModal
          isOpen={isAddEventModalOpen}
          handleClose={handleCloseAddEventModal}
        />
      )}
      <RightDrawer
        id="right-drawer"
        anchor="right"
        variant="permanent"
        open={rightOpen}
      >
        <DrawerHeader sx={{ fontFamily: 'Poppins' }}>
          <IconButton onClick={handleToggleRightDrawer}>
            {rightOpen === true ? <TaskIcon /> : <TaskIcon />}
          </IconButton>
          {rightOpen === true && <h1>Tasks</h1>}
        </DrawerHeader>
        {rightOpen === true && myEventsList && taskItems !== null && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="task-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {taskItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem disableGutters>
                            <Checkbox
                              icon={
                                item.completed ? (
                                  <CircleCheckedFilled />
                                ) : (
                                  <CircleUnchecked />
                                )
                              }
                              checkedIcon={
                                item.completed ? (
                                  <CircleCheckedFilled />
                                ) : (
                                  <CircleUnchecked />
                                )
                              }
                              onClick={(event) =>
                                handleToggleComplete(item, event)
                              }
                            />
                            <ListItemText
                              primary={item.content}
                              sx={{
                                fontFamily: 'Poppins',
                              }}
                              secondary={new Date(item.due).toLocaleString(
                                'en-US',
                                {
                                  timeZone: 'America/Los_Angeles',
                                }
                              )}
                            />
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </RightDrawer>
    </Box>
  );
}
