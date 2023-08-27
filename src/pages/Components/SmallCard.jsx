import { styled } from 'styled-components';
import CardGeneric from './CardGeneric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faSquarePollVertical,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

const CardStyled = styled.div`
  width: 350px;
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
    font-weight: 600;
    align-self: center;
  }

  span {
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
`;

const SmallCard = CardGeneric(({ type, title }) => {
  const checkIcon = () => {
    switch (type) {
      case "'study-set'":
        return faBook;
      case 'notes':
        return faSquarePollVertical;
      case 'announcement':
        return faBell;
      default:
        return faBook;
    }
  };
  return (
    <CardStyled>
      <div>
        <div>
          <span>
            <FontAwesomeIcon icon={checkIcon()} size="lg" />
          </span>
          <h2>{title}</h2>
        </div>
      </div>
    </CardStyled>
  );
});

export default SmallCard;
