import React from 'react';
import Button from '@mui/material/Button';
import { Avatar, createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { auth } from '../../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useState } from 'react';
import { postUserAsync } from './UserThunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getEmployeesAsync } from './redux/employeeThunk';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#002145',
    },
  },
});

const SignUpStyled = styled.div`
  .sign-up-container {
    display: inline-flex;
  }

  .logo-container {
    display: flex;
    width: 50vw;
    height: 100vh;
    background: #002145;
    align-items: center;
    justify-content: center;
  }

  .logo {
    display: flex-start;
    width: 25vw;
  }

  .logo-hat {
    width: 15vw;
    margin-left: 5vw;
    margin-right: 5vw;
  }

  .logo-tag {
    width: 25vw;
  }

  #email:focus,
  #employeeId:focus,
  #username:focus,
  #password:focus {
    box-shadow: none;
  }

  .sign-up-form-container {
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sign-up-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
  }

  form {
    justify-content: center;
    align-items: center;
  }

  .sign-up-form TextField {
    margin: 2%;
    width: 40vw;
  }

  .sign-up-button-div {
    margin-top: 10%;
  }

  .sign-up-button-div Button {
    width: 30vw;
    margin-left: 20%;
  }

  .sign-up-button-div .divider-div {
    margin: 2% 8%;
    color: #0074d9;
  }

  .css-oy83vm-MuiDivider-root {
    margin-left: 15%;
    margin-right: 15%;
  }
`;

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState('');

  const employees = useSelector((state) => state.employeeReducer.employees);
  const employeeIds = employees.map((employee) => employee.employeeId);

  useEffect(
    () => {
      dispatch(getEmployeesAsync());
    },
    [dispatch],
    [employees]
  );

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setErrorMessage('');
    setEmail(email);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordError('');
    setPassword(password);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNameError('');
    setFullName(name);
  };

  const handleEmployeeIdChange = (event) => {
    const employeeId = event.target.value;
    setEmployeeIdError('');
    setEmployeeId(employeeId);
  };

  const handleSignUp = () => {
    if (employeeId !== '' && !employeeIds.includes(employeeId)) {
      setEmployeeIdError('Employee Id does not exist');
      return;
    }
    if (fullName === '') {
      setNameError('Invalid Name');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid Email');
      return;
    }
    if (isGoogleEmail(email)) {
      setErrorMessage(
        'This is a google email please use the Sign in with Google option instead'
      );
      return;
    }
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods && signInMethods.length > 0) {
          // User with the same email already exists, show error message
          setErrorMessage(
            'An account with this email already exists. Please log in instead.'
          );
          return;
        }
      })
      .then(() => {
        if (validatePasswordStrength(password)) {
          createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
              const userobj = userCredential.user;
              const user = {
                uid: userobj.uid,
                email: userobj.email,
                displayName: fullName,
                profilePicture: userobj.photoURL,
                instructor: employeeId ? true : false,
                employeeId: employeeId ? employeeId : '',
              };
              Promise.all([dispatch(postUserAsync(user))]).then(() => {
                navigate('/');
              });
            }
          );
        } else {
          // Password is not strong enough, show error message
          setPasswordError(
            'Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters.'
          );
        }
      });
  };

  const validatePasswordStrength = (password) => {
    // Password validation rules (change as needed)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  function validateEmail(email) {
    // Regular expression pattern for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  }

  const isGoogleEmail = (email) => {
    const googleEmailRegex =
      /@gmail\.com$|^[\w.+-]+@(googlemail|google)\.[a-z]{2,}$/i;
    return googleEmailRegex.test(email);
  };

  const handleSignUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userobj = result.user;
        const user = {
          uid: userobj.uid,
          email: userobj.email,
          displayName: userobj.displayName,
          profilePicture: userobj.photoURL,
          instructor: employeeId ? true : false,
          employeeId: employeeId ? employeeId : '',
        };
        Promise.all([dispatch(postUserAsync(user))]).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <SignUpStyled>
        <div className="sign-up-container">
          <div className="logo-container">
            <div className="logo">
              <img
                className="logo-hat"
                src={require('../../assets/images/knowledge-hat.png')}
              ></img>
              <img
                className="logo-tag"
                src={require('../../assets/images/knowledge-tag.png')}
              ></img>
            </div>
          </div>
          <div className="sign-up-form-container">
            <div className="sign-up-form">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': {
                    m: 1,
                    width: '30vw',
                    marginLeft: '20%',
                    border: 'none',
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="username"
                  variant="outlined"
                  label="Your Full Name"
                  error={!!nameError}
                  helperText={nameError}
                  value={fullName}
                  onChange={(e) => handleNameChange(e)}
                />
                <TextField
                  id="email"
                  variant="outlined"
                  label="Your Email Address"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  error={!!errorMessage}
                  helperText={errorMessage}
                />
                <TextField
                  id="employeeId"
                  variant="outlined"
                  label="Your Employee Id"
                  value={employeeId}
                  onChange={(e) => handleEmployeeIdChange(e)}
                  error={!!employeeIdError}
                  helperText={
                    employeeIdError ? employeeIdError : 'for instructors only'
                  }
                />
                <TextField
                  id="password"
                  label="Your Password"
                  helperText={
                    passwordError
                      ? passwordError
                      : 'Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters.'
                  }
                  error={!!passwordError}
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                />
                <div className="sign-up-button-div">
                  <Button variant="contained" onClick={handleSignUp}>
                    Create Account
                  </Button>
                  <div className="divider-div">
                    <Divider variant="middle">or</Divider>
                  </div>
                  <Button
                    className="google-signin"
                    variant="outlined"
                    startIcon={
                      <Avatar
                        sx={{ height: '16px', width: '16px' }}
                        src={require('../../assets/images/google-icon.png')}
                      />
                    }
                    onClick={handleSignUpWithGoogle}
                  >
                    Sign in with Google
                  </Button>
                  <div className="divider-div">
                    <Divider variant="middle">or</Divider>
                  </div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </SignUpStyled>
    </ThemeProvider>
  );
}
