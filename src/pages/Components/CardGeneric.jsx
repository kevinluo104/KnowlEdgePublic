import { styled } from 'styled-components';

const CardStyled = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  width: fit-content;
  color: #002145;

  &:hover {
    cursor: pointer;
    color: #b2bcc7;
  }
`;

const CardGeneric = (Content) => {
  return function CardGeneric(props) {
    return (
      <CardStyled>
        <Content {...props} />
      </CardStyled>
    );
  };
};

export default CardGeneric;
