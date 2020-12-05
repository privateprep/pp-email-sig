import React, { useState } from "react";
import SignaturePreview from "./SignaturePreview";
import logo from "./logo.svg"
import "./App.css";

const App = () => {
  let [formValues, setFormValues] = useState({
  name: "Carol Johnson | she/her/hers",
  titles: [{ body: "All Star Tutor" }],
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
            <div className="field-wrap field-wrap--list">
              <label htmlFor="title">{formValues.titles.length > 1 ? 'Titles' : 'Title'}</label>
              <ul>
                {formValues.titles.map((title, titleIndex) => (
                  <li key={titleIndex}>
                    <div className="list-form-fields">
                      <input
                        name={`title[${titleIndex}].body`}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            titles: formValues.titles.map((t, i) =>
                              i === titleIndex
                                ? { ...title, body: e.target.value }
                                : t
                            ),
                          })
                        }
                        placeholder="Title..."
                        value={title.body}
                      />
                    </div>
                    <button
                      className="button button--danger"
                      type="button"
                      onClick={() =>
                        setFormValues({
                          ...formValues,
                          titles: formValues.titles.filter((_t, i) => i !== titleIndex)
                        })
                      }
                    >
                      <span role="img" aria-label="Remove">X</span>
                    </button>
                  </li>
                ))}
              </ul>
              {!!formValues.titles.length && <small style={{ fontStyle: 'italic', marginBottom: "0.5rem" }}>Don't know what to write? Ask or be creative!</small>}
              <button
                type="button"
                onClick={() =>
                  setFormValues({
                    ...formValues,
                    titles: [...formValues.titles, { body: '' }],
                  })}
              >
                Add Title
              </button>
            </div>
            <div className="field-wrap field-wrap--list">
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <label style={{ marginRight: "0.5rem" }} htmlFor="phones">Phone Numbers</label>
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
              <label htmlFor="extraContacts">Additional Contact Methods</label>
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
          <h2>Add to Gmail</h2>
          <ol>
            <li>Open Gmail in another tab</li>
            <li>In the nav menu, Click the settings gear (⚙︎) then 'See all settings'</li>
            <li>Under 'General' scroll down to 'Signature' (most of way down)</li>
            <li>Click 'Create New' name it 'PP Signature'</li>
            <li>Copy the above Preview</li>
            <li>Paste into the Signature Editor</li>
            <li>Ensure new Signature set for 'New Emails Use' and 'On Reply/Forward Use'</li>
            <li>Click 'Save Changes' at bottom of form!</li>
            <li>Send an email to yourself to double check the phone links</li>
            <li>Celebrate! 🎉</li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default App;
