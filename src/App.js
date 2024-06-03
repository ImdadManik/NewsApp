import React, {useState} from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pageSize = 5;
  const country = 'in';
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <div>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          height={5}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country={country} category={"general"} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country={country} category={"business"} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country={country} category={"entertainment"} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country={country} category={"health"} />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country={country} category={"science"} />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country={country} category={"sports"} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country={country} category={"technology"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
