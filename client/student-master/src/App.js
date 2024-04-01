import './App.css';
import Navigation from './components/Navigation';
import UploadFiles from './components/UploadFiles';
import ViewRecords from './components/ViewRecords';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Navigation/>}></Route>
        <Route path='/upload_files' exact element={<UploadFiles/>}></Route>
        <Route path='/view_records' exact element={<ViewRecords/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
