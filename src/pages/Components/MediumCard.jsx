import { styled } from 'styled-components';
import CardGeneric from './CardGeneric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faSquarePollVertical,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';

const CardStyled = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 60px;
  justify-content: center;
  margin-bottom: 20px;

  div {
    display: flex;
    width: 100%;
  }

  h2 {
    flex: 2;
    text-align: left;
    font-weight: bold;
  }

  span {
    width: 50px;
  }
`;

const MediumCard = CardGeneric(({ type, title }) => {
  var iconPick;

  if (type === 'study-set') {
    iconPick = faBook;
  } else if (type === 'notes') {
    iconPick = faSquarePollVertical;
  } else if (type === "announcement" )
  {
    iconPick = faBullhorn;
  } else {
    iconPick = "none";
  }
  return (
    <CardStyled>
      <div>
        <div>
          <span>
            {iconPick === "none"?  (<p></p>):(<FontAwesomeIcon
              icon={iconPick}
              size="lg"
            />)}
          </span>
          <h2>{title}</h2>
        </div>
      </div>
    </CardStyled>
  );
});

export default MediumCard;
