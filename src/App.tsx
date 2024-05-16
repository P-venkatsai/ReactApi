import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Result from "./Components/Result";
import $ from "jquery";

interface NameAgeResult {
  name: string;
  age: number;
  error: boolean;
}

function App() {
  const [result, setResult] = useState<NameAgeResult | null>(null);
  const [cache, setCache] = useState<{ [key: string]: NameAgeResult }>({});

  const isValidName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s-]+$/;
    return name.length > 0 && name.length <= 50 && nameRegex.test(name);
  };

  const fetchName = (name: string) => {
    name = name.trim();
    if (!isValidName(name)) {
      const errorText: NameAgeResult = {
        name: "",
        age: 0,
        error: true, // Default value for error property
      };
      setResult(errorText);
      return;
    }

    if (cache[name]) {
      setResult(cache[name]);
    } else {
      $.get(`https://api.agify.io?name=${name}`, (data: NameAgeResult) => {
        setCache((prevCache) => ({ ...prevCache, [name]: data }));
        setResult(data);
      });
    }
  };

  return (
    <>
      <Form onSubmitForm={fetchName} />
      {result && (
        <Result
          displayText={
            result.error
              ? "Please enter a valid name. Only alphabetic characters, spaces, and hyphens are allowed, and it must be between 1 and 50 characters long."
              : `The age predicted for ${result.name} is ${result.age} years.`
          }
        />
      )}
    </>
  );
}

export default App;
