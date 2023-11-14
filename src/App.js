import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./styles/Layout";
import Navigation from "./components/Navigation/Navigation";
import React, { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import Sales from "./components/Sales/Sales";
import { useGlobalContext } from "./context/globalContext";
import Orb from "./components/Orb/Orb";

function App() {
  const[active, setActive]=useState()
  
  const global = useGlobalContext()
  console.log(global);
  
  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Sales />
      case 4: 
        return <Orders />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb/>
  },[])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
    <MainLayout>
      <Navigation active={active} setActive={setActive}/>
      <main>
          {displayData()}
      </main>
    </MainLayout>
    </AppStyled>
  );
}

const AppStyled=styled.div`
height: 100vh;
background-image: url(${props=>props.bg});
position: relative;
main{
  flex: 1;
  background: skyblue;
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 0;
  }
}
`;

export default App;
