// var express = require('express');
// const clientPromise = stitch.StitchClientFactory.create('mongocrud-bgxqf');
// let client;
// let db;
// let login;

// function displayCommentsOnLoad() {
//   clientPromise.then(stitchClient => {
//     client = stitchClient;
//     db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
//     login = client.login();
//     // return login.then(displayComments);
//     login.then(() => {
//       db.collection('todo')
//         .find({})
//         .limit(100)
//         .execute()
//         .then(docs => {
//           // var html = docs.map(c => "<div>" + c.comment + "</div>").join("");
//           docs.map(c => tableRowMaker(0, c.name, c.id, c.timestamp, c.servicedDate, c.specialist));
//           // console.log(docs);
//           // document.getElementById("comments").innerHTML = html;
//         });
//     });
//   });
// }

// function addComment() {
//   const obj = addNewCustomer2();
//   // clientPromise.then(stitchClient => {
//   //   client = stitchClient;
//   db = client.service('mongodb', 'mongodb-atlas').db('mongoDB');
//   login = client.login();
//   login.then(() => db.collection('todo').insertOne(obj));
//   // .then(displayComments);
//   // foo.value = "";
//   // });
// }

// function deleteComment() {
//   db.collection('todo')
//     .deleteOne({ comment: '55555' })
//     .then(displayComments);
// }

// function editComment() {
//   db.collection('todo')
//     .updateOne({ comment: '21' }, { $set: { comment: 'hey, there' } }, { upsert: true })
//     .then(displayComments);
// }
class Person {
  constructor(name, id, timestamp, servicedDate, specialist) {
    this.name = name;
    this.id = id;
    this.timestamp = timestamp;
    this.servicedDate = servicedDate;
    this.specialist = specialist;
  }
}

function submitForm() {}

function loadCustomers() {
  get().then(data => {
    $(data).each(function(index, value) {
      // persons.push(new Person(value.name, value.id, value.timestamp, value.servicedDate, value.specialist));
      // persons.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
      tableRowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist);
    });
  });
}

function addNewCustomer() {
  if (validate()) {
    const newName = document.getElementById('name').value;
    const newId = generateId();
    const specialist = document.getElementById('spec');
    const selectedSpecialist = specialist.options[specialist.selectedIndex].value;
    const person = new Person(newName, newId.toString(), Date.now().toString(), 'not served', selectedSpecialist);
    const dataToSend = JSON.stringify(person);

    post(dataToSend).then(() => {
      location.reload();
    });
  }
}

function validate() {
  const newName = document.getElementById('name');
  const specialist = document.getElementById('spec');
  const selectedSpecialist = specialist.options[specialist.selectedIndex].value;

  if (!newName.validity.valueMissing && selectedSpecialist != '') {
    return true;
  } else document.getElementById('alert').style.display = 'block';
  return false;
}

function generateId() {
  promise = JSON.parse(getId());
  let intArray = [];
  promise.forEach(item => {
    intArray.push(parseInt(item));
  });
  return Math.max(...intArray) + 1;
}

function tableRowMaker(index, name, id, timestamp, servicedDate, specialist) {
  date = new Date(timestamp * 1).toString().substr(3, 18);

  const table = document.getElementById('table');
  const row = table.insertRow(index + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = id;
  cell2.innerHTML = name;
  cell3.innerHTML = date;
  cell4.innerHTML = formatDateOfService(servicedDate);
  cell5.innerHTML = specialist;
}

function formatDateOfService(servicedDate) {
  if (servicedDate != 'not served') {
    return (formatedDate = new Date(servicedDate * 1).toString().substr(3, 18));
  } else return servicedDate;
}