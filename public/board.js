

let thread_box;
let threaddata = [];

function newThread() {
  console.log('newThread() called');
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  fetch(`/api/${board}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  })

}

function getThreads() {
  console.log('getThreads() called');
  fetch(`/api/${board}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => threaddata = data.thread)
  .then(() => {
    console.log(threaddata);
    threaddata.forEach(getThread);
    
  })
  }

  
  function getThread(singlethread) {
    console.log(thread_box);
    const id = singlethread._id;
    const thread = document.createElement('div');
    thread.classList.add('thread');
    thread.innerHTML = `<div class='post'>
      <h3>${singlethread._id}</h3><h3>${singlethread.time}</h3>
      <h3>${singlethread.title}</h3>
      <p>${singlethread.content}</p>
      <button onClick="replyThread('${id}')">Reply</button>
      </div>
    `;
    console.log(id)
    thread_box.insertBefore(thread, thread_box.firstChild);
    setTimeout(() => {
      fetch(`/api/${board}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }, 24 * 60 * 60 * 1000);
  }

function replyThread(id) {
  console.log('replyThread() called', id);
  window.location.href = `/${board}/${id}`;
}

window.onload = function() {
  thread_box = document.querySelector('.thread-box');
  getThreads();
};