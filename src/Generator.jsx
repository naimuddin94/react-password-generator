import { useState, useEffect, useRef } from "react";

function Generator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [characterAllow, setCharacterAllow] = useState(false);

  const passwordRef = useRef(null);

  useEffect(() => {
    const passwordGenerator = () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllow) str += "0123456789";
      if (characterAllow) str += "@#$%^&*+";
      for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
      setPassword(pass);
    };
    passwordGenerator();
  }, [length, numberAllow, characterAllow]);

  const handleCopy = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="bg-slate-300 h-screen pt-8">
      <h1 className="text-3xl font-bold text-slate-700 text-center my-5 font-mono">
        Password Generator
      </h1>
      <div className="">
        <div className="w-4/12 min-w-fit mx-auto flex focus-within:ring-2 focus-within:ring-blue-700 rounded-md">
          <input
            value={password}
            readOnly
            ref={passwordRef}
            type="text"
            className="w-full rounded-s-md py-2 focus: outline-0 px-3"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-700 px-6 text-white shrink-0 rounded-e-md hover:bg-blue-800 duration-200 font-semibold uppercase"
          >
            Copy
          </button>
        </div>
        <div className="mt-2 w-fit mx-auto flex gap-4 items-center font-medium text-slate-700">
          <div>
            <input
              type="range"
              value={length}
              min={4}
              max={30}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="">length({length})</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              onChange={() => setNumberAllow(!numberAllow)}
            />
            <label>Number</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              onChange={() => setCharacterAllow(!characterAllow)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generator;
