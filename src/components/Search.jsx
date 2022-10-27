import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import PropTypes from "prop-types";
import Debug from "debug";

const debug = new Debug("quicknotes: components:Search.jsx");

function Search(props) {
  const { query, setQuery } = props;

  const handleOnChange = (event) => {
    debug(`updating query from ${query} to ${event.target.value}`)
    setQuery(event.target.value);
  };

  return (
    <Input
      icon={<IconSearch />}
      placeholder="Your search query"
      value={query}
      onChange={handleOnChange}
    />
  );
}

export default Search;

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
