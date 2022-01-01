import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";
import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Card/CardDetails";


const Home = () => {
  let [fetchedData, updateFetchedData] = useState([]);
  let {info, results} = fetchedData;
  let [pageNumber, updatePageNumber] = useState(1); //initialise hook with 1 (to return page 1 of api by default)
  let [search, setSearch] = useState(""); //initialise with blank string
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

useEffect(() => {
  (async function () {
    let data = await fetch(api).then((res) => res.json());
    updateFetchedData(data);
    console.log(data);
  })();
}, [api]);

  return (
  <div className="App">
  <h1 className="text-center ubuntu my-3">Characters</h1>
  <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
  <div className="container">
  <div className="row">
    <Filter
    pageNumber={pageNumber}
    status={status}
    updateStatus={updateStatus}
    updateGender={updateGender}
    updateSpecies={updateSpecies}
    updatePageNumber={updatePageNumber}
  />
    <div className="col-lg-8 col-12">
      <div className="row">
        <Card page="/" results={results} />
      </div>
    </div>
  </div>
  <Pagination
  info={info}
  pageNumber={pageNumber}
  updatePageNumber={updatePageNumber}
/>
  </div>
</div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardDetails />} />

        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CardDetails />} />

        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}






export default App;
