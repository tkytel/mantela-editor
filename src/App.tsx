import Nav from "./components/Nav";
import Editor from "./components/Editor";
import { Provider } from "jotai";

function App() {

  return (
    <Provider>
      <div className="container mx-auto">
        <Nav />
        <Editor />
      </div>
    </Provider>
  )
}

export default App
