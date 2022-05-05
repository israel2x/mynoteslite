import "./App.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesListPage from "./pages/NotesListPage";
import { Route, BrowserRouter as Router } from "react-router-dom";
import NotePage from "./pages/NotePage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <Header></Header>
          <Route path="/" exact component={NotesListPage}></Route>
          <Route path="/note/:id" component={NotePage}></Route>
          <Footer></Footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
