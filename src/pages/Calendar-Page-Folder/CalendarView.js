import React from 'react';
import NavbarComponent from '../Components/Navbar';
import SideMenu from './SideMenu';
import { styled } from 'styled-components';

const NavbarStyled = styled('div')`
  .kcRayQ {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
    position: relative;
    z-index: 100;
  }
`;
const SideMenuStyled = styled('div')`
  .MuiDrawer-paper {
    z-index: 4;
    position: fixed;
    top: initial;
  }

  .MuiCheckbox-colorSecondary.Mui-checked:hover {
    background-color: rgba(0, 33, 69, 0.08);
  }

  .MuiCheckbox-colorSecondary:hover {
    background-color: rgba(0, 33, 69, 0.08);
  }
  .PrivateSwitchBase-input-4:hover {
    background-color: rgba(0, 33, 69, 0.08);
  }

  .MuiListItemText-primary {
    font-family: 'Poppins';
  }

  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root {
    font-family: 'Poppins';
  }

  .css-1ju4ly1-MuiAutocomplete-root
    .MuiOutlinedInput-root
    .MuiAutocomplete-endAdornment {
    top: auto;
  }

  .css-50mqxb {
    justify-content: flex-start;
  }

  #right-drawer .css-192qrng {
    justify-content: flex-start;
  }

  .MuiDrawer-paperAnchorRight {
    margin-right: 0;
    z-index: 4;
    position: fixed;
    top: initial;
  }

  .MuiCheckbox-colorSecondary.Mui-checked {
    color: #002145;
  }

  .MuiListItemIcon-root {
    min-width: 64px;
  }
`;
export default function CalendarView() {
  return (
    <div>
      <NavbarStyled>
        <NavbarComponent />
      </NavbarStyled>
      <SideMenuStyled>
        <SideMenu />
      </SideMenuStyled>
    </div>
  );
}
