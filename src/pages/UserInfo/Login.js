import React from 'react';
import Button from '@mui/material/Button';
import { Avatar, createTheme, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { postUserAsync } from './UserThunks';

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

const LoginStyled = styled.div`
  .login-container {
    display: inline-flex;
  }

  #divider .css-qywfm8-MuiDivider-wrapper {
    color: #002145;
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

  .login-form-container {
    width: 50vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
  }

  #username:focus,
  #password:focus {
    box-shadow: none;
  }

  form {
    justify-content: center;
    align-items: center;
  }

  .login-form TextField {
    margin: 2%;
    width: 40vw;
  }

  .login-button-div {
    margin-top: 10%;
  }

  .login-button-div Button {
    width: 30vw;
    margin-left: 20%;
  }

  .login-button-div .divider-div {
    margin: 2% 8%;
    color: #002145;
  }

  .text-focus {
    border: none !important; /* Override the interfering border style */
  }

  input:focus {
    outline: none;
  }

  .css-oy83vm-MuiDivider-root {
    margin-left: 15%;
    margin-right: 15%;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setUsernameErrorMessage('');
    setEmail(email);
  };

  const handlePasswordChange = (event) => {
    setPasswordErrorMessage('');
    const password = event.target.value;
    setPassword(password);
  };

  const handleLogIn = () => {
    if (isGoogleEmail(email)) {
      setUsernameErrorMessage(
        'This is a google email address, use the log in with google option instead'
      );
      return;
    }
    if (!validateEmail(email)) {
      setUsernameErrorMessage('Invalid Email Address');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userobj = userCredential.user;
        const user = {
          uid: userobj.uid,
          email: userobj.email,
          displayName: userobj.displayName,
          profilePicture: userobj.photoURL,
        };
        Promise.all([dispatch(postUserAsync(user))]).then(
          ([postUserResult]) => {
            navigate('/');
          }
        );
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // Email does not exist, show error message
          setUsernameErrorMessage(
            'Invalid email address. Please check your email and try again.'
          );
        } else if (error.code === 'auth/wrong-password') {
          // Password does not match, show error message
          setPasswordErrorMessage(
            'Invalid password. Please check your password and try again.'
          );
        } else {
          console.log('Error logging in:', error);
        }
      });
  };

  function validateEmail(email) {
    // Regular expression pattern for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  }

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userobj = result.user;
        const user = {
          uid: userobj.uid,
          email: userobj.email,
          displayName: userobj.displayName,
          profilePicture: userobj.photoURL,
        };
        Promise.all([dispatch(postUserAsync(user))]).then(
          ([postUserResult]) => {
            navigate('/');
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const isGoogleEmail = (email) => {
    const googleEmailRegex =
      /@gmail\.com$|^[\w.+-]+@(googlemail|google)\.[a-z]{2,}$/i;
    return googleEmailRegex.test(email);
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginStyled>
        <div className="login-container">
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
          <div className="login-form-container">
            <div className="login-form">
              <Box
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
                  label="Your Email Address"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  error={!!usernameErrorMessage}
                  helperText={usernameErrorMessage}
                />

                <TextField
                  id="password"
                  variant="outlined"
                  label="Your Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  error={!!passwordErrorMessage}
                  helperText={passwordErrorMessage}
                />
                <div className="login-button-div">
                  <Button variant="contained" onClick={handleLogIn}>
                    Login
                  </Button>
                  <div className="divider-div">
                    <Divider
                      sx={'.MuiDivider-wrapper{color: #002145;}'}
                      variant="middle"
                    >
                      or
                    </Divider>
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
                    onClick={handleLoginWithGoogle}
                  >
                    Sign in with Google
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </LoginStyled>
    </ThemeProvider>
  );
}
