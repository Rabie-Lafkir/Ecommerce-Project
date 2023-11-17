import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* Add this line at the top of your CSS file */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');


  body,html {
    font-size: 16px; 
    font-family: 'Roboto', 'Nunito Sans', sans-serif;    
    height: 100%;
    
  }

  body{
    background-color: #ebeeef;
  }
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;

  }

  body, html, #root {
    height: 100%;
  }
`;

  


export default GlobalStyle;