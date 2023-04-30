import React, { useEffect, useState } from "react";
import axios from "axios";

const Materi = () => {
  //  materi fetching  data
  const [data, setData] = useState(null);

  //  materi create data
  const [input, setInput] = useState({
    name: "",
  });

  // indikator
  const [fetchStatus, setFetchStatus] = useState(true);

  useEffect(() => {
    // fetch dengan kondisi
    if (fetchStatus === true) {
      axios
        .get("https://backendexample.sanbercloud.com/api/contestants")
        .then((res) => {
          setData([...res.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  // handling input
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "name") {
      setInput({ ...input, name: value });
    }
  };

  // handling submit
  const handleSubmit = (event) => {
    event.preventDefault();

    let { name } = input;

    // create data
    axios
      .post("https://backendexample.sanbercloud.com/api/contestants", { name })
      .then((res) => {
        console.log(res);
        setFetchStatus(true);
      });

    // clear input setelah create data
    setInput({
      name: "",
    });
  };
  // membuat handling delete
  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);

    axios
      .delete(
        `https://backendexample.sanbercloud.com/api/contestants/${idData}`
      )
      .then((res) => {
        setFetchStatus(true);
      });
  };

  return (
    <>
      <div className="container">
        <ul>
          {data !== null &&
            data.map((res) => {
              return (
                <>
                  <li>
                    {res.name} &nbsp;
                    <button onClick={handleDelete} value={res.id}>
                      delete
                    </button>
                  </li>
                </>
              );
            })}
        </ul>
      </div>

      <p className="container">Form Data</p>

      {/* form data */}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input onChange={handleInput} value={input.name} name="name" />
          <input type={"submit"} />
        </form>
      </div>
    </>
  );
};
export default Materi;
