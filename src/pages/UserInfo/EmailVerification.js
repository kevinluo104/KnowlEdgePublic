import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useState } from 'react';
import { auth } from '../../firebase';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#0074d9',
    },
  },
});

const LoginStyled = styled.div`
  .login-container {
    display: inline-flex;
  }

  .logo-container {
    display: flex;
    width: 50vw;
    height: 100vh;
    background: #0074d9;
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
    color: #0074d9;
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

  .proceed-button {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: center;
  }
`;

export default function EmailVerification() {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);
  const handleProceed = async () => {
    try {
      await auth.currentUser.reload(); // Refresh user's authentication state
      const user = auth.currentUser;

      if (user && user.emailVerified && !redirected) {
        navigate('/');
        setRedirected(true);
      }
    } catch (error) {
      console.log(error);
    }
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
                Account Successfully created! Please check your email for a
                verification link!
                <div className="proceed-button">
                  <Button onClick={handleProceed}>Proceed</Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </LoginStyled>
    </ThemeProvider>
  );
}
