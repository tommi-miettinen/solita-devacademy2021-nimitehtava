import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import "./App.css";

const App = () => {
  const [data, setData] = useState<{ names: Name[] }>({ names: [] });
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity");

  interface Name {
    amount: number;
    name: string;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("/names");
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotalAmount = (arr: Name[]) => {
    return arr.reduce((total, item) => item.amount + total, 0);
  };

  const filterByName = (arr: Name[]) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const sortByAlphabet = (arr: Name[]) => {
    return [...arr].sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  const sortByPopularity = (arr: Name[]) => {
    return [...arr].sort((a, b) => b.amount - a.amount);
  };

  const sort = () => {
    const { names } = data;
    if (sortBy === "popularity") return sortByPopularity(filterByName(names));
    if (sortBy === "alphabet") return sortByAlphabet(filterByName(names));
    return filterByName(names);
  };

  const names = sort();

  return (
    <div className="container" style={{ margin: "30px auto" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nimet</TableCell>
              <TableCell align="center">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    className="tablehead"
                    style={{
                      marginLeft: "auto",
                      alignItems: "center",
                    }}
                  >
                    Hae nimellä:
                  </div>
                  <TextField
                    style={{ minWidth: "80px" }}
                    placeholder="Hae..."
                    value={searchInput}
                    onChange={(e: any) => setSearchInput(e.target.value)}
                  ></TextField>
                </div>
              </TableCell>
              <TableCell align="right">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="tablehead" style={{ marginLeft: "auto" }}>
                    Järjestä:
                  </div>
                  <div>
                    <Select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="popularity">Suosituimmat</MenuItem>
                      <MenuItem value="alphabet">Nimen mukaan</MenuItem>
                    </Select>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right">
                Nimien määrä: ({calculateTotalAmount(names)})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell colSpan={3} align="right">
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
