import { IconNote } from "@tabler/icons";
import { Grid, Button, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import Search from "./Search";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LightModeButton from "./LightModeButton";


function Header(props) {
  const { query, setQuery, add, toggleColorScheme, mode } = props;
  const navigate = useNavigate();
  
  const handleOnClick = () => {
    const { id, title, text } = add();
    navigate("/edit", { state: { id, title, text, mode: "remove-on-cancel" } });
  };


  return (
    <Grid>
      <Grid.Col span={9}>
        <Search query={query} setQuery={setQuery} />
      </Grid.Col>

      <Grid.Col span={2}>
        <Button
          onClick={handleOnClick}
          fullWidth
          variant="default"
          leftIcon={<IconNote />}
        >
          Add Note
        </Button>
      </Grid.Col>

      <Grid.Col span= {1} > 
      <ColorSchemeProvider>
         <LightModeButton toggleColorScheme={toggleColorScheme} mode = {mode}/>
      </ColorSchemeProvider>
      </Grid.Col>

    </Grid>
  );
}

export default Header;

Header.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  add: PropTypes.func,
  toggleColorScheme: PropTypes.func,
  mode: PropTypes.string,
};
