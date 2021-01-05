import React, { useState, useEffect } from "react";
import {
  Form,
  Header,
  Container,
  List,
  Input,
  Segment,
} from "semantic-ui-react";

import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
    //asdf
  }, []);

  const getTodos = async () => {
    try {
      let res = await axios.get("/api/todos");
      setTodos(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/todos", { name: name })
      .then((res) => {
        setTodos([res.data, ...todos]);
      })
      .catch((err) => {
        alert("error occured");
      });

    setName("");
  };
  const updateTodo = async (id) => {
    let res = await axios.put(`/api/todos/${id}`);
    // so res.data is going updated todo
    const updatedTodos = todos.map((t) => (t.id === id ? res.data : t));
    setTodos(updatedTodos);
  };

  // lets say I  did delete...asdfas
  //asdfasdfasdf

  return (
    <Container>
      <Segment textAlign="center">
        <Header as="h3" textAlign="center">
          Todo List
        </Header>
        <Form onSubmit={handleSubmit}>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
        <List>
          {todos.map((t, i) => (
            <List.Item
              key={i}
              onClick={() => updateTodo(t.id)}
              style={{ color: t.complete ? "grey" : "black" }}
            >
              {t.name}
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};

export default App;

// make changes on your local machine (devolpment)
// test on dev !!make sure things are working!!
// push to a branch on git (for now directly pushing to master) !!make sure things are working!!
// then we can do our production stuff
