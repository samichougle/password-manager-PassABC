function maskPassword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      // alert("Copied the text: " + txt);
    },
    () => {
      // alert("Coping Failed");
    }
  );
}

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrayUpdate = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrayUpdate));
  alert(`Sucessfully Deleted ${website}'s password`);
  showPassword();
};

const showPassword = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data === null || JSON.parse(data.length === 0)) {
    tb.innerHTML = "No Data To Show";
  } else {
    tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
          </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
    <td>${element.website} <img onclick="copyText('${
        element.website
      }')"  src="copy.svg" alt="Copy Button" width="24" height="24">
</td>
    <td>${element.username} <img onclick="copyText('${
        element.username
      }')"  src="copy.svg" alt="Copy Button" width="24" height="24">
</td>
    <td>${maskPassword(element.password)} <img onclick="copyText('${
        element.password
      }')" src="copy.svg" alt="Copy Button" width="24" height="24">
</td>
    <td><button class="buttonDelete" onclick="deletePassword('${
      element.website
    }')">Delete</button></td>
</tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

//Logic to fill the table
showPassword();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
});
