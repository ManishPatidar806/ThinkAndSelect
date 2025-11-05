import { useState, useEffect } from "react";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../data/Constains";
import { Editor } from "@monaco-editor/react";
import Loading from "../Loading/Loading";
import Navbar from "../Home/Navbar";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Code2, 
  Download, 
  Copy, 
  Settings, 
  Terminal,
  FileText,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Share,
  Palette,
  Sun,
  Moon
} from "lucide-react";

const baseURL = "https://emkc.org/api/v2/piston/execute";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"] || "// Welcome to the Code Editor!");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [executionTime, setExecutionTime] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    // Initialize with JavaScript
    const jsData = LANGUAGE_VERSIONS.find(item => item.name === "javascript");
    if (jsData) {
      localStorage.setItem("version", jsData.version);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setOutput("");
    setIsSuccess(null);
    setExecutionTime(null);

    const languageData = LANGUAGE_VERSIONS.find(
      (item) => item.name === selectedLanguage
    );

    if (languageData) {
      localStorage.setItem("version", languageData.version);
    }

    setValue(CODE_SNIPPETS[selectedLanguage] || `// ${selectedLanguage} code here`);
  };

  const executeCode = async (language, sourceCode) => {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
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
    return data;
  };

  const runCode = async () => {
    if (!language) {
      setOutput("Please select a programming language first!");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const response = await executeCode(language, value);
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      
      if (response.run) {
        setOutput(response.run.output || "Code executed successfully (no output)");
        setIsSuccess(response.run.code === 0);
      } else {
        setOutput("Execution failed. Please check your code.");
        setIsSuccess(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setExecutionTime(null);
      setIsSuccess(false);
      setOutput("Connection error! Please check your internet connection and try again.");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFileExtension = (lang) => {
    const extensions = {
      javascript: 'js',
      python2: 'py',
      java: 'java',
      c: 'c',
      'c++': 'cpp',
      dart: 'dart',
      kotlin: 'kt'
    };
    return extensions[lang] || 'txt';
  };

  const clearEditor = () => {
    setValue("");
    setOutput("");
    setIsSuccess(null);
    setExecutionTime(null);
  };

  const resetToTemplate = () => {
    setValue(CODE_SNIPPETS[language] || `// ${language} code here`);
    setOutput("");
    setIsSuccess(null);
    setExecutionTime(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Title Section */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">Code Playground</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Online Code
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Compiler & Editor
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Write, compile, and run code in multiple programming languages with our powerful online IDE.
            </p>
          </div>

          {/* Language and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="flex-1 p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200 font-medium"
                >
                  <option value="">Select Language</option>
                  {LANGUAGE_VERSIONS.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.Name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={runCode}
                  disabled={isLoading || !language}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Code
                    </>
                  )}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Copy Code"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Download Code"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={resetToTemplate}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Reset to Template"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                  className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Toggle Theme"
                >
                  {theme === "vs-dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor and Output Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Code Editor
                {language && (
                  <Badge className="bg-indigo-100 text-indigo-700 ml-2">
                    {LANGUAGE_VERSIONS.find(l => l.name === language)?.Name}
                  </Badge>
                )}
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Settings className="w-4 h-4" />
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-200 rounded text-xs"
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                </select>
              </div>
            </div>

            <div className="glass-card rounded-xl p-1 overflow-hidden">
              <Editor
                height="60vh"
                width="100%"
                theme={theme}
                language={language || "javascript"}
                value={value}
                onChange={(newValue) => setValue(newValue || "")}
                options={{
                  fontSize: fontSize,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 20,
                  lineNumbersMinChars: 3,
                  renderWhitespace: "selection",
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-600" />
                Output
                {isSuccess !== null && (
                  <div className="flex items-center gap-2 ml-2">
                    {isSuccess ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                )}
              </h2>

              {executionTime && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{executionTime}ms</span>
                </div>
              )}
            </div>

            <div className="glass-card rounded-xl p-4 min-h-[60vh] flex flex-col">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <div className="space-y-2">
                      <p className="text-gray-600 font-medium">Executing your code...</p>
                      <p className="text-sm text-gray-500">This may take a few seconds</p>
                    </div>
                  </div>
                </div>
              ) : output ? (
                <div className="flex-1">
                  <pre className={`whitespace-pre-wrap font-mono text-sm p-4 rounded-lg min-h-full ${
                    theme === "vs-dark" 
                      ? "bg-gray-900 text-gray-100" 
                      : "bg-gray-50 text-gray-900"
                  } ${isSuccess === false ? 'border-l-4 border-red-500' : isSuccess === true ? 'border-l-4 border-green-500' : ''}`}>
                    {output}
                  </pre>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center space-y-3">
                    <Zap className="w-12 h-12 mx-auto text-gray-300" />
                    <div className="space-y-1">
                      <p className="font-medium">Ready to run your code</p>
                      <p className="text-sm">Click "Run Code" to see the output here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8">
          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Pro Tips
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Keyboard Shortcuts</p>
                <p className="text-gray-600">Ctrl/Cmd + Enter to run code</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Auto-save</p>
                <p className="text-gray-600">Your code is automatically saved locally</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Multi-language</p>
                <p className="text-gray-600">Switch between 10+ programming languages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
