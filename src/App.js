import React, { useState } from "react";
import SignaturePreview from "./SignaturePreview";
import logo from "./logo.svg"
import "./App.css";

const App = () => {
  let [formValues, setFormValues] = useState({
  name: "Carol Johnson | she/her/hers",
  title: "Account Manager",
  phones: [{ type: "m.", number: "212.123.4567", note: "" }],
});

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__header__wrap">
          <img src={logo} alt="Private Prep Logo" />
        </div>
      </header>
      <main className="App__main">
        <div>
          <h2>Form</h2>
          <form>
            <div className="field-wrap">
              <label htmlFor="name">Name + Pronouns</label>
              <input
                name="name"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
              {!formValues.name && (
                <span role="alert" style={{ color: "var(--danger)" }}>
                  Required
                </span>
              )}
            </div>
            <div className="field-wrap">
              <label htmlFor="name">Title</label>
              <input
                name="title"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
              {!formValues.title && (
                <span role="alert" style={{ color: "var(--danger)" }}>
                  Required
                </span>
              )}
            </div>
            <div className="field-wrap">
              <label htmlFor="name">Phone Numbers</label>
              <ul>
                {formValues.phones.map((phone, phoneIndex) => (
                  <li key={phoneIndex}>
                    <input
                      name={`phones[${phoneIndex}].type`}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          phones: formValues.phones.map((p, i) =>
                            i === phoneIndex
                              ? { ...p, type: e.target.value }
                              : p
                          ),
                        })
                      }
                      placeholder={"Type... (m|o|h)"}
                      value={phone.type}
                    />
                    <input
                      name={`phones[${phoneIndex}].number`}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          phones: formValues.phones.map((p, i) =>
                            i === phoneIndex
                              ? { ...p, number: e.target.value }
                              : p
                          ),
                        })
                      }
                      value={phone.number}
                    />
                    <input
                      name={`phones[${phoneIndex}].note`}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          phones: formValues.phones.map((p, i) =>
                            i === phoneIndex
                              ? { ...p, note: e.target.value }
                              : p
                          ),
                        })
                      }
                      value={phone.note}
                      placeholder={"Note... (Whats app enabled)"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormValues({
                          ...formValues,
                          phones: formValues.phones.filter((_p, i) => i !== phoneIndex)
                        })
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  setFormValues({
                    ...formValues,
                    phones: [...formValues.phones, { type: "m.", number: "212.123.4567", note: "" }],
                  })}
              >
                Add Phone Number
              </button>
            </div>
          </form>
        </div>
        <div>
          <h2>Preview</h2>
          <div style={{ backgroundColor: "var(--bg-alt)", padding: "1rem" }}>
            <SignaturePreview {...formValues} />
          </div>
          <button
            style={{ marginTop: "1rem" }}
            onClick={() => alert("Make me work!")}
          >
            Copy to Clipboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
