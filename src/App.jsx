import { useState, useCallback, useEffect, useRef } from "react";
// first set the state like num or char is allowed 

function App() {
  const [length, setLength] = useState(8);
  const [num, setIsNumallowed] = useState(false);
  const [char, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // this function is used to generate password if char and num allow then it also included in string
  const passWordGenetrate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passWordGenetrate();
  }, [length, num, char, passWordGenetrate]);
  return (
    <>
      <div
        style={{
          background: "black",
          width: "100%",
         
        }}
      >
        <div style={{ width: '50%', marginLeft: "auto", marginRight: "auto", color:'yellowgreen',  }}>
          <h1 className="text-white text-center my-3">Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              // the useref is used for to view that which part of text is slected 
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={num}
                id="idnum"
                onChange={() => setIsNumallowed((prev) => !prev)}
              />

              <label htmlFor="idnum">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={char}
                id="idnum"
                onChange={() => setIsCharAllowed((prev) => !prev)}
              />
              <label htmlFor="idnum">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
