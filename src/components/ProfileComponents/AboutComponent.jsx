import React, { useState } from "react";

export default function AboutComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([
    "First",
    "Last",
    "2023-01-01",
    "mail@gmail.com",
    "123-456-7890",
    "Ave",

  ]);
  const [itemsName, setItemsName] = useState([
    "First Name",
    "Last Name",
    "Birthday",
    "Email",
    "Number",
    "Address",

  ]);
  const [inputPatterns, setInputPatterns] = useState([
    "[A-Za-zs]+",
    "[A-Za-zs]+",
    "\\d{4}-\\d{2}-\\d{2}",
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
    "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    "[A-Za-z0-9s.,'-]+",
  ]);

  const [patternString, setPatternStrings] = useState([
    "Xxx+",
    "Xxx+",
    "YYYY-MM-DD",
    "xxxxxx@xmail.com",
    "XXX-XXX-XXXX",
    "ADDRESS",
  ]);

  const [initialItems, setInitialItems] = useState([...items]);

  const [inputType, setInputType] = useState([
    "name",
    "name",
    "date",
    "email",
    "tel",
    "text",
  ]);

  const handleInputChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index] = event.target.value;
    setItems(updatedItems);
  };

  const makeListEditable = (e) => {
    e.preventDefault();
    setInitialItems([...items]);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setItems([...initialItems]);
    setIsEditing(false);
  };
  const saveList = (e) => {
    e.preventDefault();
    // Perform validation on the input values
    const isValid = items.every((item, index) => {
      const pattern = new RegExp(inputPatterns[index]);
      //   console.log(pattern.test(item));
      return pattern.test(item);
    });

    if (isValid) {
      setIsEditing(false);
      // Proceed with saving the changes
      // ...
    } else {
      // Show an error message or handle invalid inputs
      console.log("Invalid inputs");
    }
  };

  return (
    <div className="aboutContainer">
        <h1 className="heading" >About Me</h1>
        <br></br>
      <form>
        {items.map((item, index) => (
          <div key={index} className="mb-3 flex items-center gap-40">
            <label htmlFor={itemsName[index]}>{itemsName[index]}:</label>
            {isEditing ? (
              <input className="line"
                type={inputType[index]}
                name={itemsName[index]}
                value={item}
                onChange={(event) => handleInputChange(index, event)}
                pattern={inputPatterns[index]}
                required
                onInvalid={(event) => {
                  event.target.setCustomValidity(
                    `Please follow the format ${patternString[index]}`
                  );
                }}
                onInput={(event) => {
                  event.target.setCustomValidity("");
                }}
              />
            ) : (
              <span className="line">{item}</span>
            )}
          </div>
        ))}
        {isEditing ? (
          <div>
            <button className="editButton" onClick={saveList}>
              Save
            </button>
            <button className="editButton" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button className="editButton" onClick={makeListEditable}>
              Edit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}