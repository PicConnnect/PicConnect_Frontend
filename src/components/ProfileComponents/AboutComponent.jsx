import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserNameInBackend, fetchUser } from "../../redux/userSlice";

import ProfilePhoto from "./ProfilePhoto";

export default function AboutComponent() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);

  const items = useSelector((state) => state.user.items);
  //console.log(items);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (userStatus === "loading") {
    return <div>Loading...</div>; // or some other loading indicator
  }

  if (userStatus === "failed") {
    return <div>Error loading user data.</div>; // or some other error message
  }

  return (
    <div className="aboutContainer flex">
      <div className="flex items-center space-x-4 mt-4">
        <ProfilePhoto></ProfilePhoto>
      </div>
    </div>
  );
}

// const [itemsName, setItemsName] = useState([
//   "Name",
//   "Birthday",
//   "Email",
//   "Number",

// ]);
// const [inputPatterns, setInputPatterns] = useState([
//   "[A-Za-zs]+",
//   "\\d{4}-\\d{2}-\\d{2}",
//   "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
//   "[0-9]{3}-[0-9]{3}-[0-9]{4}",
// ]);

// const [patternString, setPatternStrings] = useState([
//   "Xxx+",
//   "YYYY-MM-DD",
//   "xxxxxx@xmail.com",
//   "XXX-XXX-XXXX",
// ]);

// const [initialItems, setInitialItems] = useState([...items]);

// const [inputType, setInputType] = useState([
//   "name",
//   "name",
//   "date",
//   "email",
//   "tel",
// ]);

// const handleInputChange = (index, event) => {
//   const updatedItems = [...items];
//   updatedItems[index] = event.target.value;
//   setItems(updatedItems);
// };

// const makeListEditable = (e) => {
//   e.preventDefault();
//   setInitialItems([...items]);
//   setIsEditing(true);
// };

// const cancelEdit = () => {
//   setItems([...initialItems]);
//   setIsEditing(false);
// };
// const saveList = (e) => {
//   e.preventDefault();
//   // Perform validation on the input values
//   const isValid = items.every((item, index) => {
//     const pattern = new RegExp(inputPatterns[index]);
//     //   console.log(pattern.test(item));
//     return pattern.test(item);
//   });

//   if (isValid) {
//     setIsEditing(false);
//         // If the name has changed, update it in the backend
//   if (items[0] !== initialItems[0]) {
//     dispatch(updateUserNameInBackend(userId, items[0]));
//   }
//   } else {
//     // Show an error message or handle invalid inputs
//     console.log("Invalid inputs");
//   }
// };

// return (
//   <div className="aboutContainer">
//     <form>
//       {items.map((item, index) => (
//         <div key={index} className="mb-3 flex items-center gap-40">
//           <label htmlFor={itemsName[index]} className="block text-xl font-bold">{itemsName[index]}:</label>
//           {isEditing ? (
//             <input className="line"
//               type={inputType[index]}
//               name={itemsName[index]}
//               value={item}
//               onChange={(event) => handleInputChange(index, event)}
//               pattern={inputPatterns[index]}
//               required
//               onInvalid={(event) => {
//                 event.target.setCustomValidity(
//                   `Please follow the format ${patternString[index]}`
//                 );
//               }}
//               onInput={(event) => {
//                 event.target.setCustomValidity("");
//               }}
//             />
//           ) : (
//             <h3 className="block text-xl">{item}</h3>
//           )}
//         </div>
//       ))}
//       {isEditing ? (
//         <div>
//           <button className="editButton" onClick={saveList}>
//             Save
//           </button>
//           <button className="editButton" onClick={cancelEdit}>
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <div>
//           <button className="editButton" onClick={makeListEditable}>
//             Edit
//           </button>
//         </div>
//       )}
//     </form>
//   </div>
// );
