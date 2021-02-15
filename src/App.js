import React from "react";
import axios from "axios";
import Datatable from "./datatable/Datatable";
import { useEffect, useState } from "react";

import "./App.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then((response) => response.json())
      .then((response) => response.records)
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        ></input>
      </div>
      <div>
        <Datatable data={data} />
      </div>
    </div>
  );
}
