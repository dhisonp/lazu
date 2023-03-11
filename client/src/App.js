// TODO
// - Get rid of lorem ipsum
// - Add loading/indicator for a simple user feedback
// - Add UI elements for the options slang, tone and positive
// - Add "size" slider
// - Ensure responsive layout
// - Copy to clipboard]
// - MVP Done -> refer to README.md for future features.

import React, { useState } from "react";
import axios from "axios";

function App() {
    const [text, setText] = useState("");
    const [slang, setSlang] = useState(true);
    const [tone, setTone] = useState(true); // true: Casual, false: Formal
    const [positive, setPositive] = useState(true); // true: Positive, false: Negative
    const [response, setResponse] = useState(
        "Ex cupidatat excepteur sunt non."
    );
    // const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        // e.preventDefault();
        // const data = new FormData;
        // data.append("text", text);
        // data.append("slang", slang);
        // data.append("tone", tone);
        // data.append("positive", positive);
        // console.log(data);
        const data = {
            text: text,
            slang: slang,
            tone: tone,
            positive: positive,
        };
        axios
            .post("http://localhost:4000/reply", data, {})
            .then((res) => {
                if (res.data.message) {
                    setResponse(res.data.reply);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div class="py-12 flex justify-center items-center min-h-screen p-1 bg-gray-900 flex-col">
            <div>
                <h1 class="my-4 text-5xl font-headline tracking-wider font-extrabold leading-snug">
                    Lazu
                </h1>
            </div>
            <div class="m-4">
                <label class="block mb-2 text-sm font-medium text-gray-100">
                    What am I responding to?
                </label>
                <div class="flex">
                    <div class="w-80 text-center">
                        <input
                            type="text"
                            id="text"
                            class=" border-gray-300 text-sm rounded-md block w-full p-2.5 bg-gray-700"
                            placeholder="Wyd tonight?😛"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 mx-2 rounded-full"
                    >
                        ➡
                    </button>
                </div>
            </div>
            <div class="bg-gray-100 min-h-20 w-3/6 text-black px-2 py-1 rounded-md mt-4 overflow-auto">
                {response}
            </div>
        </div>
    );
}

export default App;
