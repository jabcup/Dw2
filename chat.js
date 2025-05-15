const inputContainer = document.getElementById('input-container');
const messageContainer = document.getElementById('message-container');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');
const secondButton = document.getElementById('second-button')
const secondInput = document.getElementById('second-msg')
const chatContainer = document.getElementById('chat-container')

let inactivityTimer = null;
const INACTIVITY_LIMIT = 5000; // 5 segundos

function sendMessage2() {
    console.log("jeje")
    const message = secondInput.value.trim();
    if (message === '') return;

    const messageBubble = document.createElement('div');
    messageBubble.textContent = message;
    messageBubble.style.background = '#ff4655';
    messageBubble.style.color = '#fff';
    messageBubble.style.padding = '8px 12px';
    messageBubble.style.margin = '5px 0';
    messageBubble.style.borderRadius = '8px';
    messageBubble.style.alignSelf = 'flex-start';
    messageBubble.style.maxWidth = '80%';

    messageContainer.appendChild(messageBubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    userMessageInput.value = '';
    clearTimeout(inactivityTimer);
    hideInputWithAnimation();
}

function sendMessage() {
    console.log("jeje")
    const message = userMessageInput.value.trim();
    if (message === '') return;

    const messageBubble = document.createElement('div');
    messageBubble.textContent = message;
    messageBubble.style.background = '#ff4655';
    messageBubble.style.color = '#fff';
    messageBubble.style.padding = '8px 12px';
    messageBubble.style.margin = '5px 0';
    messageBubble.style.borderRadius = '8px';
    messageBubble.style.alignSelf = 'flex-end';
    messageBubble.style.maxWidth = '80%';

    messageContainer.appendChild(messageBubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    userMessageInput.value = '';
    clearTimeout(inactivityTimer);
    hideInputWithAnimation();
    hideChatWithAnimation();
}

function hideInputWithAnimation() {
    if (inputContainer.classList.contains('show')) {
        inputContainer.classList.remove('show');
        setTimeout(() => {
            inputContainer.classList.add('hidden');
        }, 300); // Coincide con la transición del CSS
    }
}
function hideChatWithAnimation() {
    if (chatContainer.classList.contains('show')) {
        chatContainer.classList.remove('show');
        setTimeout(() => {
            chatContainer.classList.add('hidden');
        }, 300); // Coincide con la transición del CSS
    }
}
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        hideChatWithAnimation();
        hideInputWithAnimation();
    }, INACTIVITY_LIMIT);
}

// Mostrar el input al presionar Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inputContainer.classList.contains('hidden')) {
            e.preventDefault();
            chatContainer.classList.remove('hidden');
            inputContainer.classList.remove('hidden');
            void inputContainer.offsetWidth; // Forzar reflow para animación
            chatContainer.classList.add('show');
            inputContainer.classList.add('show');
            userMessageInput.focus();
            resetInactivityTimer();
        } else {
            e.preventDefault();
            sendMessage();
        }
    }
});

// Detectar escritura en el input
userMessageInput.addEventListener('input', resetInactivityTimer);

// Botón de enviar
sendButton.addEventListener('click', sendMessage);
secondButton.addEventListener('click', sendMessage2);
// Ocultar input si se hace clic fuera del chat
document.addEventListener('click', function (e) {
    const chatContainer = document.getElementById('chat-container');

    if (!chatContainer.contains(e.target) && inputContainer.classList.contains('show')) {
        hideInputWithAnimation();
        clearTimeout(inactivityTimer);
    }
});