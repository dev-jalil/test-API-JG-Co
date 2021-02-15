import React from "react";

import Datatable from "./datatable/Datatable";
import { useEffect, useState } from "react";

import { makeStyles, fade } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import "./App.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const useStylesNav = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL)
      .then((response) => response.json())
      .then((response) => response.records)
      .then((json) => setData(json));
  }, []);

  function search(rows) {
    return rows.filter((row) => row.fields.name.toLowerCase().indexOf(q) > -1);
  }

  const classesNave = useStylesNav();

  return (
    <div>
      <div className={classesNave.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classesNave.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classesNave.title} variant="h6" noWrap>
              Velib Disponibility
            </Typography>
            <div className={classesNave.search}>
              <div className={classesNave.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Station Name"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                classes={{
                  root: classesNave.inputRoot,
                  input: classesNave.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div>
        <Container maxWidth="sm">
          <Datatable data={search(data)} />
        </Container>
      </div>
    </div>
  );
}
