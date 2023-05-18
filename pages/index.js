import { useEffect, useState } from "react";
// import Image from "next/image";

export default function IndexPage() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    fetch("https://api.zenon.si/post")
      .then((response) => response.json())
      .then((data) => setList(data));
  };

  const tweet = () => {
    if (inputValue !== "" && name !== "") {
      setInputValue("");
      fetch("https://api.zenon.si/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, content: inputValue }),
      }).then(() => loadList());
    }
  };
  return (
    <div className="min-h-full bg-gray-100 flex flex-col items-center">
      {/* <Image src="/images/logo.jpg" width={200} height={200} alt="ฟูจิ" /> */}
      <form
        div
        className="w-1/2 flex flex-col items-end"
        onSubmit={(event) => {
          event.preventDefault();
          alert("สวัสดี");
          tweet();
        }}
      >
        <div className="w-full mt-32 bg-white p-6 rounded-lg shadow">
          <div className="w-full bg-black p-4 rounded-lg shadow-;g">
            <input
              type="text"
              onChange={({ target: { value } }) => setName(value)}
              required
            />
          </div>
          <div>
            <textarea
              rows={8}
              className="outline-none w-full resize-none"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value;
                setInputValue(value);
              }}
            />
            {/* <input
              type="text"
              className="bg-red-400"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value;
                setInputValue(value);
              }}
            /> */}
          </div>
        </div>
        {/* <div>
          <textarea
            className="mt-2 outline-non resize-none rounded-lg p-2 shadow-lg"
            value={nameValue}
            onChange={(event) => {
              const value = event.target.value;
              setNameValue(value);
            }}
          />
        </div> */}
        <button
          className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          type="submit"
        >
          Tweet {inputValue}
        </button>
        <button
          className="bg-gray-400 text-white p-4 rounded-lg"
          type="button"
          onClick={loadList}
        >
          Refresh
        </button>
      </form>
      <div className="w-1/2 mt-8">
        {list.map((data) => {
          return (
            <div
              key={data.id}
              className="mt-4 bg-white rounded-lg shadow-lg p-6"
            >
              <h1 className="text-xl font-bold">{data.name}</h1>
              <div className="mt-2 text-gray-600">{data.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
