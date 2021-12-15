const email = document.querySelector('#email');
const amount = document.querySelector('#amount');
const table = document.querySelector('#table');
const button = document.querySelector('.button');

const delReq = async (email) => {
  fetch(`https://mailing-list-dn.herokuapp.com/${email}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => loadPage())
}
const loadPage = async () => {
  table.innerHTML = "";
  fetch('https://mailing-list-dn.herokuapp.com/')
    .then(res => res.json())
    .then(res => res.data.map((e) => {
      table.innerHTML += `<tr><td>${e.email}</td><td>${e.amount}</td><td><button class="del button">Delete</button></td></tr>`;
    }))
    .then(res => {
      const del = document.querySelectorAll('.del');
      del.forEach(element => {
        element.addEventListener('click', (e) => {
          delReq(element.parentElement.parentElement.childNodes[0].innerText);
        })
      });
    });
}
loadPage()

const sendData = () => {
  if (amount.value < 1) {
    amount.value = 1;
  }
  if (amount.value > 20) {
    amount.value = 20;
  }
  email.value = email.value.toLowerCase();
  if (!email.value || !amount.value) return
  fetch('https://mailing-list-dn.herokuapp.com/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({"email": email.value, "amount": amount.value})
  }).then(() => {
    loadPage()
  })
}

button.addEventListener('click', sendData);
