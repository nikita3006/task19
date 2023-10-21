// Initialize  form and add an event listener to handle form submission
const form = document.querySelector("form");
form.addEventListener("submit", myfun);

async function myfun(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;

  const user = {
    name,
    email,
  };

  try {
    //  the axios.post method to send the user data to your API
    const res = await axios.post(
      "https://crudcrud.com/api/cf0d8469104b4563b17a9de154479a12/appointmentData",
      user
    );

    alert("User Added");
    console.log(res.data);

    // Call addData with the response data
    addData(res.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Action Failed");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  //  axios.get to fetch data from the API
  axios.get('https://crudcrud.com/api/cf0d8469104b4563b17a9de154479a12/appointmentData')
    .then(res => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        addData(res.data[i]);
      }
    })
    .catch(err => console.error(err));
});

function addData(data) {
  const div = document.createElement("div");
  div.className = "user";

  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  h1.innerText = data.name; 
  p.innerText = data.email;

  const del = document.createElement("button");
  del.innerText = "Delete";
  div.append(h1, p, del);

  del.addEventListener('click', (e) => {
    e.preventDefault();

    //  axios.delete to delete the user data
    axios.delete(`https://crudcrud.com/api/cf0d8469104b4563b17a9de154479a12/appointmentData/${data._id}`)
      .then(() => {
        div.remove();
      })
      .catch(err => console.error(err));
  });

  document.querySelector("body").append(div);
}
