// modal functions
const btnCloseModal = document.querySelector('#btn-close-modal')
const modal = document.querySelector('#modal')
const input = document.getElementById('name-input')
modal.showModal()
var userName;

const isInputEmpty = ()=>{
    return input.value === "" ? true : false
}
const getName = ()=>{
    userName = input.value
    console.log(userName)
    return userName
}
btnCloseModal.addEventListener('click', ()=>{
    if(isInputEmpty()){
        alert("Username input empty")
    }
    else{
        getName()
        modal.close()
    }
})
// websocket functions
let url = `ws://${window.location.host}/ws/socket-server`
const chatSocket = new WebSocket(url)
chatSocket.onmessage = function(e){
    let = data = JSON.parse(e.data)
    console.log('Data:', data)

    if(data.type === 'chat'){
        let messages = document.getElementById('messages')
        messages.insertAdjacentHTML('beforeend', `<div class="message">
                <strong>${data.username}</strong>
                <p>${data.message}</p>
            </div>`)
        console.log(data.username)
    }
}
let form = document.getElementById('form')
form.addEventListener('submit', (e)=> {
    e.preventDefault()
    let message = e.target.msg.value
    chatSocket.send(JSON.stringify({
        'username':userName,
        'message':message
    }))
    form.reset()
})