document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelector('#messages');
    messages.style.display = 'none';
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', submitForm);
});

async function submitForm() {
    const name = document.querySelector('#name').value.trim();
    const feedback = document.querySelector('#feedback').value.trim();
    if (name || feedback) {
        const data = {
            name: name,
            feedback: feedback
        };
        try {
            const response = await fetch('https://lab6-165-default-rtdb.firebaseio.com/msg.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }
            hideFormFetchDataWithAsyncAwait();
        } catch (error) {
            console.error('Error saving data: ', error.message);
        }
    } else {
        alert('Please fill in the field of course feedback.');
    }
}

function hideForm() {
    const submitForm = document.querySelector('#submitForm');
    const messages = document.querySelector('#messages');

    submitForm.style.display = 'none';
    messages.style.display = 'block';
}

async function hideFormFetchDataWithAsyncAwait() {
    hideForm();
    try {
        const response = await fetch('https://lab6-165-default-rtdb.firebaseio.com/msg.json');
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        displayMessages(data);
    } catch (error) {
        console.error('Error fetching data: ', error.message);
    }
}

function displayMessages(data) {
    const messagesList = document.querySelector('#messages');
    messagesList.innerHTML = ''; // Clear previous messages
    for (const key in data) {
        const message = data[key];
        const messageElement = document.createElement('li');
        messageElement.textContent = `${message.name}: ${message.feedback}`;
        messagesList.appendChild(messageElement);
    }
}
