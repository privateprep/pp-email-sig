import React, { useState } from "react";
import SignaturePreview from "./SignaturePreview";
import logo from "./logo.svg"
import "./App.css";

const App = () => {
  let [formValues, setFormValues] = useState({
  name: "Carol Johnson | she/her/hers",
  title: "Account Manager",
  phones: [{ type: "m.", number: "212.867.5309", note: "" }],
  extraContacts: [],
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
            <div className="field-wrap field-wrap--list">
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <label style={{ marginRight: "0.5rem" }}htmlFor="name">Phone Numbers</label>
                <small style={{ fontStyle: 'italic' }}>Check links to call work!</small>
              </div>
              <ul>
                {formValues.phones.map((phone, phoneIndex) => (
                  <li key={phoneIndex}>
                    <div className="list-form-fields list-form-fields--number">
                      <input
                        name={`phones[${phoneIndex}].type`}
                        style={{ flex: "0 0 3rem" }}
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
                        placeholder={"Note like '(Whats app)'"}
                      />
                    </div>
                    <button
                      className="button button--danger"
                      type="button"
                      onClick={() =>
                        setFormValues({
                          ...formValues,
                          phones: formValues.phones.filter((_p, i) => i !== phoneIndex)
                        })
                      }
                    >
                      <span role="img" aria-label="Remove">X</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  setFormValues({
                    ...formValues,
                    phones: [...formValues.phones, { type: "m.", number: "212.867.5309", note: "" }],
                  })}
              >
                Add Phone Number
              </button>
            </div>
            <div className="field-wrap field-wrap--list">
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <label style={{ marginRight: "0.5rem" }} htmlFor="phone_numbers">Additional Contact Methods</label>
              </div>
              <label htmlFor="name">


              </label>
              <ul>
                {formValues.extraContacts.map((extraContact, extraIndex) => (
                  <li key={extraIndex}>
                    <div className="list-form-fields">
                      <input
                        name={`extraContacts[${extraIndex}].body`}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            extraContacts: formValues.extraContacts.map((extra, i) =>
                              i === extraIndex
                                ? { ...extra, body: e.target.value }
                                : e
                            ),
                          })
                        }
                        placeholder="Contact method like skype..."
                        value={extraContact.body}
                      />
                    </div>
                    <button
                      className="button button--danger"
                      type="button"
                      onClick={() =>
                        setFormValues({
                          ...formValues,
                          extraContacts: formValues.extraContacts.filter((_extra, i) => i !== extraIndex)
                        })
                      }
                    >
                      <span role="img" aria-label="Remove">X</span>
                    </button>
                  </li>
                ))}
              </ul>
              {!!formValues.extraContacts.length && <small style={{ fontStyle: 'italic', marginBottom: "0.5rem" }}>Tip: you can type <code>'&nbsp'</code> to have extra spaces stick!</small>}
              <button
                type="button"
                onClick={() =>
                  setFormValues({
                    ...formValues,
                    extraContacts: [...formValues.extraContacts, { body: '' }],
                  })}
              >
                Add Additional Contact Field
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
            style={{ marginTop: "1rem", width: 166, textAlign: "center" }}
            onClick={(event) => {
              let previewEl = document.getElementById("SignaturePreview");
              let copyText = previewEl.innerHTML

              navigator.clipboard
                .writeText(copyText)
                .then(() => {
                  // temp swap icon label!
                  event.target.innerText = '✅ Copied!'
                  setTimeout(() => {
                    event.target.innerText = 'Copy to Clipboard'
                  }, 2000);
                })
                .catch(err => {
                  event.target.innerText = '😥 Error!'
                  console.error(`Error copying text to clipboard: ${err}`);
                });

                document.execCommand("copy", false, copyText);
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
