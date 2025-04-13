import Nav from "./components/Nav";
import Editor from "./components/Editor";
import { Provider } from "jotai";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider>
      <div className="container mx-auto">
        <Nav />
        <Editor />
        <Footer />
      </div>
    </Provider>
  )
}

export default App
