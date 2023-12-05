import styled,{keyframes} from "styled-components";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }

`;

export const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  &:hover {
    background: ${props => props.theme.colors.secondary};
    animation: ${jump} 0.2s ease-out forwards;
  }
`;


export const Underline = styled.div`
  width: 90px;
  height: 2px;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 50px;
  align-self: center;
`;

export const Separator = styled.div`
  width: 2px;
  height: 80%;
  margin-top: 50px;
  background-color: ${props => props.theme.colors.third};
  margin-bottom: 50px;
  align-self: center;
`;


export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  /* color: ${props => props.theme.colors.primary}; */

  text-align: center;
`;

export const SecondTitle = styled.h5`
  font-size: 0.5rem;
  text-align: center;
  margin-bottom: 10px;

`;

export const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 20px ;

`

export const Logo = styled.img`
margin: 0 auto;
width: 30%;
max-width: 414px;
padding: 1.3rem;
display: flex;
flex-direction: column;
position: relative;
`;



export const style = { fonSize: "2rem",transition: 'font-size 0.02s'  };

