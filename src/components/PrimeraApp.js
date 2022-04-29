import React, { useRef, useState } from 'react'
import styled from "styled-components";

const ButtonC = styled.button`
  background-color: green;
  border: 2px solid pink;
  border-radius: 5px;
  color: black;
  padding: 10px;
  box-shadow: 5px 5px 5px 0px lightgray;
`;

const ButtonD = styled(ButtonC)`
  background-color: red;
`;

const PrimeraApp = () => {
  const [heroes, setHeroes] = useState([]);
  const [hero, setHero] = useState("");
   
  const inputHero = useRef(null);

  const handleChange = (e) => {
    //console.log(e.target.name);
    setHero(e.target.value); 
    console.log(e.target.value);
  }
  
  const handleClick = () => {
  
    setHeroes([...heroes, { hero: hero , completed: false }]);
    console.log(heroes);
    inputHero.current.value = "";
    setHero("");  
    
  }

  const handleDelete = (hero) => {
    let msg = `Delete ${hero.hero}`
    console.log(msg);


    setHeroes(heroes.filter(heroes => (
      heroes.hero !== hero.hero
    )));
  }

  const handleReslizada = (heroComp) => {
    console.log(heroComp);
    setHeroes(heroes.map(hero => (
      hero.hero === heroComp.hero ? { hero: heroComp.hero, completed: true} : hero
    )));
  }

  return (
    <>
      <h2>Be a Hero</h2>
      <label>Name:</label>
      <input type="text" className="inputs" name="name" ref={inputHero}  onChange={handleChange}></input>

      <button onClick={handleClick}>Agregar Hero</button>
      <hr></hr>
      <h4>Heroes:</h4>
      <ol>
        { heroes.map((hero , key) => (
            <><li key={key}>{hero.hero}<ButtonD onClick={() => handleDelete(hero)}> Delete</ButtonD><ButtonC onClick={() => handleReslizada(hero)}>Realizada</ButtonC>
            {hero.completed ? <h6>Compleatado</h6> : <h6>No Completado</h6>}
            </li></>
       ))}
      </ol>
    </>
  )
}


export default PrimeraApp;