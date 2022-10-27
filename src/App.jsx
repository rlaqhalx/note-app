import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Debug from "debug";
import NotFound from "./pages/NotFound";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";

const debug = new Debug("quick:App.jsx");

function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark"? "light" : "dark"));
  }
  
  useEffect(() => {
    setColorScheme(window.localStorage.getItem("mode"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mode", colorScheme)
  },[colorScheme])
  

  useEffect(() => {
    // const fakeNotes = [];
    // for (let index = 0; index < 5; index++) {
    //   fakeNotes.push({
    //     id: faker.datatype.uuid(),
    //     title: faker.lorem.sentence(),
    //     text: faker.lorem.paragraph(),
    //   });
    // }

    // persist after refresh / killing off app and reopen it
    const storedNotes = window.localStorage.getItem("notes");
    const initNotes = storedNotes ? JSON.parse(storedNotes) : []
    //setNotes(fakeNotes);
    setNotes(initNotes);
  }, []);


  // useEffect(() => {
  //   const fakeNotes = [];
  //   for (let index = 0; index < 5; index++) {
  //     fakeNotes.push({
  //       id: faker.datatype.uuid(),
  //       title: faker.lorem.sentence(),
  //       text: faker.lorem.paragraph(),
  //     });
  //   }
  //   setNotes(fakeNotes);
  // }, []);
  
  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes))
  },[notes])

  const remove = (id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  const add = () => {
    const note = {
      // added id -> individual note different id
      id: faker.datatype.uuid(),
      title: "New note title",
      text: "New note text",
    };

    setNotes((notes) => [...notes, note]);

    return note;
  };

  const edit = (id, title, text) => {
    debug("note changing")
    debug({id, title, text})
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) {
          return note;
        } else {
          return { id, title, text };
        }
      })
    );
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <Routes>
            <Route
              path="/"
              element={
                  <Home
                    notes={notes}
                    query={query}
                    setQuery={setQuery}
                    add={add}
                    remove={remove}
                    toggleColorScheme= {toggleColorScheme}
                  />
              }
            />
          <Route path="/edit" element={<Edit edit={edit} remove={remove} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>

  );
}

export default App;
