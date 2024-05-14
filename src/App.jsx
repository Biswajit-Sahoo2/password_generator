import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // State variable to store the length of the password
  const [length, setLength] = useState(6)
  // State variable to track if numbers are allowed in the password
  const [numberAllowed, setNumberAllowed] = useState(false)
  // State variable to track if special characters are allowed in the password
  const [charAllowed, setCharAllowed] = useState(false)
  // State variable to store the generated password
  const [password, setPassword] = useState(false)
  // Reference to the password input field
  const passwordRef = useRef(null)

  // Callback function to generate a new password
  const passwordGenerator = useCallback(() => {
    let pass = ""
    // Define the character set for the password
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // If numbers are allowed, add them to the character set
    if (numberAllowed) {
      str += "0123456789";
    }
    // If special characters are allowed, add them to the character set
    if (charAllowed) {
      str += "@#!%$&*_`<>";
    }
    // Generate the password by randomly selecting characters from the character set
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      let char = str.charAt(randomIndex);
      pass += char;
    }
    // Update the password state with the generated password
    setPassword(pass);


  }, [length, numberAllowed, charAllowed, setPassword]);

  // Effect hook to generate a new password when the length, numberAllowed, or charAllowed state changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  // Function to handle changes to the password length input field
  const changeRange = (e) => {
    setLength(e.target.value)
  }

  // Callback function to copy the generated password to the clipboard
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,14);
    window.navigator.clipboard.writeText(password);

  }, [password])

  // JSX to render the password generator UI
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
