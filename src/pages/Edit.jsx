import { Button, Container, Group, Stack } from "@mantine/core";
import { TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { RichTextEditor } from '@mantine/rte';


function Edit(props) {
  const { edit, remove } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  const [mode, setMode] = useState("");

  const [value, onChange] = useState('hi');

  useEffect(() => {
    // prevent directly going to edit - no props being sent 
    // replace: true -> pop out history so cannot go back to mistake 
    if (location.state == null) {
      navigate("/", {replace: true})
    } else {
      setId(location.state.id);
      setTitle(location.state.title);
      // setText(location.state.text);
      setMode(location.state.mode);
      onChange(location.state.text);
     }
  }, [location.state]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // const handleTextChange = (event) => {
  //   setText(event.target.value);
  // };

  const handleSave = () => {
    edit(id, title, value);
    navigate("/", { replace: true });
  };

  const handleCancel = () => {
    if (mode === "remove-on-cancel") {
      remove(id);
    }
    navigate("/", { replace: true });
  };
  
  return (
    <Container>
      <Stack spacing="lg">
        <TextInput
          placeholder="Your note's title"
          label="Title"
          withAsterisk
          value={title}
          onChange={handleTitleChange}
        />
       
        <RichTextEditor
          value = {value}
          onChange={onChange}
        />

        <Group position="center" spacing="xl" grow>
          <Button variant="subtle" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

export default Edit;

Edit.propTypes = {
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
