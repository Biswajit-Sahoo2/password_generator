import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#!%$&*_`<>";
    }
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      let char = str.charAt(randomIndex);
      pass += char;
    }

    setPassword(pass);


  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const changeRange = (e) => {
    setLength(e.target.value)
  }

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,14);
    window.navigator.clipboard.writeText(password);

  }, [password])

  return (
    <>
      <div className="bg-slate-700 h-60 w-3/5 justify-center flex my-24 rounded-xl mx-60">
        <div>
          <h2 className="font-bold text-4xl py-2 my-6">PASSWORD GENERATOR</h2>
          <div className="flex justify-center">
            <input value={password} readOnly placeholder="Enter Password" className="rounded-lg w-96 px-4 py-2 text-lg outline-none" ref={passwordRef} />
            <button className="bg-blue-700 shrink-0 py-2 w-16 text-xl text-white outline-none rounded-lg" onClick={copyPassword}>Copy</button>
          </div>
          <div className="flex justify-center py-4">
            <input type="range" min={0} max={15} className="w-40" onChange={changeRange} />
            <label className="py-4 px-4 text-orange-600">Length: {length}</label>

            <input type="checkbox" className="py-4 px-4" onChange={() => { setNumberAllowed(!numberAllowed) }} />
            <label className="py-4 px-1 text-orange-600">Numbers</label>

            <input type="checkbox" className="py-4 ml-4" onChange={() => { setCharAllowed(!charAllowed) }} />
            <label className="py-4 px-1 text-orange-600">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
