RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }; //index component //

const Search = ({ setCurrentId }) => {
  const cars = useSelector((state) => state.cars);

  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [foundWords, setFoundWords] = useState("");

  const searchWord = (keyword) => {
    keyword = RegExp.escape(keyword.toLowerCase());
    const pattern = `[A-Za-z.\s]*${keyword}[A-Za-z.\s]*`;
    const matchRegex = new RegExp(pattern);

    const foundWords = cars.filter((item) =>
      matchRegex.test(item.model.toLowerCase())
    );
    setFoundWords(foundWords);
  };

  const searchEvent = (e) => {
    const keyword = e.target.value;
    searchWord(keyword);
  };

  const inputEvent = (e) => {
    const data = e.target.value;
    setQ(data);

    if (data !== "") {
      showResults();
    } else {
      hideResults();
    }
  };

  const showResults = () => {
    setIsOpen(true);
  };

  const hideResults = () => {
    setIsOpen(false);
  };

  const clear = () => {
    setCurrentId(null);
    setQ("");
  };

  return (
    <section className="section container row">
      <div className="input-field container col s9 l9 m9">
        <input
          type="text"
          name="search"
          id="search"
          value={q}
          onInput={inputEvent}
          onChange={searchEvent}
        />
        <label htmlFor="search"> Model: </label>
      </div>
      <div className="icons col s3 m3 l3">
        <br />
        <br />
        <i
          className=" material-icons indigo-text text-darken-3 waves-effect waves-light"
          onClick={clear}
        >
          backspace
        </i>
      </div>
      <SearchResult
        isOpen={isOpen}
        items={foundWords}
        setCurrentId={setCurrentId}
        setIsOpen={setIsOpen}
      />

            {/******  search result component *******/}

      {/* if (!isOpen) return null; return (
      <>
        {items &&
          items.map((item) => {
            return (
              <ul key={item._id}>
                <li
                  onClick={() => {
                    setCurrentId(item._id);
                    setIsOpen(false);
                  }}
                >
                  {item.brand} {item.model} {item.version}
                </li>
              </ul>
            );
          })}
      </>
      ) */}




    </section>
  );
};
