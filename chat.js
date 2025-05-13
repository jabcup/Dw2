const inputContainer = document.getElementById('input-container');
const messageContainer = document.getElementById('message-container');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

let inactivityTimer = null;
const INACTIVITY_LIMIT = 5000; // 5 segundos

function sendMessage() {
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
}

function hideInputWithAnimation() {
    if (inputContainer.classList.contains('show')) {
        inputContainer.classList.remove('show');
        setTimeout(() => {
            inputContainer.classList.add('hidden');
        }, 300); // Coincide con la transición del CSS
    }
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        hideInputWithAnimation();
    }, INACTIVITY_LIMIT);
}

// Mostrar el input al presionar Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inputContainer.classList.contains('hidden')) {
            e.preventDefault();
            inputContainer.classList.remove('hidden');
            void inputContainer.offsetWidth; // Forzar reflow para animación
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

// Ocultar input si se hace clic fuera del chat
document.addEventListener('click', function (e) {
    const chatContainer = document.getElementById('chat-container');

    if (!chatContainer.contains(e.target) && inputContainer.classList.contains('show')) {
        hideInputWithAnimation();
        clearTimeout(inactivityTimer);
    }
});