import React from "react";
/* import axios from "axios";
 */ import Datatable from "./datatable/Datatable";
/* import { useEffect, useState } from "react";
 */
import "./App.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
  /*  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then((response) => response.json())
      .then((json) => setData(json.records));
  }, []); */

  return (
    <div>
      <Datatable />
    </div>
  );
}
