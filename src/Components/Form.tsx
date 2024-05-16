import { useState } from "react";

interface FormProps {
  onSubmitForm?: (item: string) => void;
}

const Form = (props: FormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (props.onSubmitForm) {
      props.onSubmitForm(name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="PredictedName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="PredictedName"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
