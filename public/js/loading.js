
((global) => {
  const getcookie = () => {
    const resq = {};
    for (const items of document.cookie.split(';')) {
      const pair = items.split('=')
      resq[pair[0].trimStart()] = pair[1];
    }
    return resq
  }
  const cookies = getcookie()

  let screenSubmit = () => {
    const resq = document.createElement('span');
    resq.className = 'container container-upload';
    resq.innerHTML = `
  <div class="content container-content-upload">
    <div class="nombre">
      <p class="cargando">subiendo video</p>
    </div>
    <div class="progress-container">
      <p class="percent">0%</p>
      <progress id="progress" class="progress" max="99" value="0"></progress>
      <p class="percent">100%</p>
    </div>
    <div class="progress-elements">
      <button class="cancel-progress btn" onclick="window.module.cancelUpdate()">cancel</button>
      <button class="accept-upload btn" id="accept" disabled>upload</button>
    </div>
  </div>
`;
    return resq
  }
  const socket = io('/account/add', {
    autoConnect: false,
    query: {
      idUser: cookies['idUser']
    }
  })
  const form = document.getElementById('video_add')
  const main = document.getElementsByTagName('main')[0]
  const btn = document.getElementById('submit-archive')
  let send = false

  form.onsubmit = (e) => {
    e.preventDefault();
    socket.connect()
  }

  socket.on('post data', async () => {
    if (send)
      return
    main.appendChild(screenSubmit())
    const content = new FormData(form)
    for (const [key, value] of content.entries()) {
}
    await fetch('/account/add', {
      method: 'POST',
      body: content
    })
    send = true

  })
  let interval;
  socket.on('startUpload', () => {

    interval = setInterval(() => {

      socket.emit('upload')
    }, 3000)

  })


  socket.on('percent', (percent) => {

    document.getElementById('progress').value = Math.ceil(percent)
    if (percent >= 99) {
      clearInterval(interval)
      document.getElementById('accept').remove()
      const item = document.getElementsByClassName('progress-elements')[0]
      item.innerHTML += `<a href='/'><button class="accept-upload btn" onclick="window.module.uploadVideo()">upload</button></a>`
    }
  })
  function cancelUpdate() {
    socket.emit('cancel')
    clearInterval(interval)
    document.getElementsByClassName('container-upload')[0].remove()
    socket.disconnect();

  }
  function uploadVideo() {
    socket.emit('accept')
  }
  global.module = {
    cancelUpdate,
    uploadVideo
  }
})(window)