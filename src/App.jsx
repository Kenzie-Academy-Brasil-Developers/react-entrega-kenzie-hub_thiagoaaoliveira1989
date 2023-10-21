import { useContext } from "react";
import Routes from "./routes"
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./providers/UserContext";

function App() {

  const { loading } = useContext(UserContext);

  return (
    <> {
      loading ?
        <div>Carregando....</div>
        :
        <>
          <Routes />
          <ToastContainer />
        </>
    }
    </>
  )
}

export default App
