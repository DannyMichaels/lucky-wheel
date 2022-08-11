import React, { Fragment, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { ReactComponent as Logo } from "./delete.svg";
import PressButton from './components/PressButton';
import Wheel from './components/Wheel';
import "./App.css";

const map = function (value, in_min, in_max, out_min, out_max) {
  //console.log(value);
  //console.log(
  //  ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  //);
  if (value === 0) {
    return out_min;
  }
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function App() {

  const [list, setList] = useState([]);
  //console.log(list);
  const [name, setName] = useState("");
  const [power, setPower] = useState(0);
  const [acc, setAcc] = useState(0);
  const config = { mass: 50, tension: 200, friction: 200, precision: 0.001 };
  const [props, set] = useSpring(() => ({
    transform: "rotate(0deg)",
    immediate: false,
  }));
  const addItem = () => {
    setList([...list, name]);
    setName("");
  };

  const deleteItem = (e) => {
    const { item } = e.currentTarget.dataset;
    setList(list.filter((e) => e !== item));
  };

  const reset=()=>{
    setList([])
    setName('')
  }

  useEffect(() => {
    set({
      from: { transform: `rotate(${map(acc, 0, 100, 0, 1700)}deg)` },
      transform: `rotate(${map(acc + power, 0, 100, 0, 1700)}deg)`,
      immediate: false,
      config,
    });
    setAcc(acc + power);
  }, [power]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Wheel list={list} springProps={props} />
      {list.length ?  <PressButton setPower={setPower} disabled={!list.length} style={{ height: "20vh" }} /> : null}
      <div style={{ /* marginTop: "20vh" ,*/ marginBottom: "5vh" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="button" onClick={addItem}>Add</button>
        <button className="button" onClick={reset}>reset</button>
        {list.map(n => (
          <div key={n} className="item">
            {n}
            <Logo
              data-item={n}
              fill="#a3aab8"
              style={{ height: "1em", width:'auto', verticalAlign: "sub", marginLeft: "5px" }}
              onClick={deleteItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
