
let thread_box;
let threaddata = [];
let replybox ;

console.log('thread.js loaded', board);

function newReply() {
  console.log('newReply() called');
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  fetch(`/api/${board}/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Reply created:', data);
    getReplys(); 
  })

}

function getReplys() {
  console.log('getReplys() called');
  fetch(`/api/${board}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => replydata = data.reply)
  .then(() => {
    replybox.innerHTML = '';
    console.log(replydata);
    replydata.forEach(reply => getReply(reply));
    
  })
  }
  
  


  function getReply(reply) {
    const id = reply._id;
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `<div class='post'>
      <h3>${reply._id}</h3><h3>${reply.time}</h3>
      <h3>${reply.title}</h3>
      <p>${reply.content}</p>
      </div>
    `;
    replybox.insertBefore(post, replybox.firstChild);
  
    setTimeout(() => {
      fetch(`/api/${board}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok) {
          post.remove();
        } else {
          console.error('Failed to delete post');
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    }, 24 * 60 * 60 * 1000); // 24小时的毫秒数
  }

function replyThread(id) {
  console.log('replyThread() called', id);
  window.location.href = `/${board}/${id}`;
}

window.onload = function() {
  replybox = document.querySelector('.reply-box')
  getReplys();
};