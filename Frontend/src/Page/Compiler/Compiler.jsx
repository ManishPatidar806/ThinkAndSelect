import { useState } from "react";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../data/Constains";
import { Editor } from "@monaco-editor/react";
import Loading from "../Loading/Loading";
import Navbar from "../Home/Navbar";
import Prevent from "../Auth/Prevent";
const baseURL = "https://emkc.org/api/v2/piston/execute";

const Compiler = () => {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setOutput("");

    const languageData = LANGUAGE_VERSIONS.find(
      (item) => item.name === selectedLanguage
    );

    if (languageData) {
      localStorage.setItem("version", languageData.version);
    }

    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  const executeCode = async (language, sourceCode) => {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      body: JSON.stringify({
        language: language,
        version: localStorage.getItem("version"),
        files: [
          {
            content: sourceCode,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.run.output;
  };

  const runCode = async () => {
    setIsLoading(true);
    try {
      const response = await executeCode(language, value);
      setIsLoading(false);
      setOutput(response);
    } catch (error) {
      setIsLoading(false);
      setOutput("Your Connection is Unstable! Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#EEF2FF" }} className="min-h-screen">
      <Prevent />
      <div className="py-[3%]">
        <Navbar />
      </div>

      <div className="container p-1 min-w-[100%]  md:mx-auto md:p-5 font-sans">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold   mb-3 md:mb-0">PlayGround</h1>
          <div className="flex items-center">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="mr-4 p-2 border border-sky-50 rounded"
            >
              {LANGUAGE_VERSIONS.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.Name}
                </option>
              ))}
            </select>

            <button
              onClick={runCode}
              className="bg-purple-500 text-white px-0.5 md:px-4  py-2 rounded hover:bg-purple-600"
            >
              Run Code
            </button>
          </div>
        </div>
        <Editor
          className=""
          height="75vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          value={value}
          onChange={(value) => setValue(value)}
        />

        <div className="bg-transparent w-100% mt-4 ">
          <h2 className="text-xl font-bold mb-2">Output</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <pre className="whitespace-pre-wrap bg-slate-900 rounded text-white min-h-40 w-full p-2">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compiler;
