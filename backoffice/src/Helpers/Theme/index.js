import { ThemeProvider } from "styled-components";




export const light = {
  title :"light",
  colors: {
    background: "#fff",
    text:"#000",
    primary : '#0000ff',
    secondary : '#002db3',
    third: '#bfcfff',
    header : '#ffffff',
    profile : '#f8f9fe',
    profileCard : '#e8ebff'
  }
};

export const dark = {
  title :"dark",
  colors: {
    background: "#121b2c",
    text:"#f8f9fe",
    primary : '#4d63dd',
    title1 : '#b5b5b5',
    header : '#1b2942',
    profile : '#2b3e5e',
    profileCard : '#273c60'

  }
};


const Theme = ({ children }) => {
  
  return (
    <ThemeProvider theme={light}>{children}</ThemeProvider>
  );
};

export default Theme;