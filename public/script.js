function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
  
    // Display the user's message in the chat container with a label and line
    displayMessage('user', message);
  
    // Send the user's message to the server for generating a response
    fetch('/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        // Display the generated response in the chat container with a label and line
        displayMessage('model', data.response);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  
    // Clear the input field
    messageInput.value = '';
  }
  
  function displayMessage(role, text) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);
  
    // Add a label based on the role
    const label = document.createElement('span');
    label.classList.add('label');
    label.innerText = role === 'user' ? 'You:' : 'Gemini:';
    messageElement.appendChild(label);
  
    // Add the text content
    const content = document.createElement('span');
    content.innerText = text;
    messageElement.appendChild(content);
  
    // Add a line between responses
    if (chatContainer.lastChild) {
      const line = document.createElement('div');
      line.classList.add('line');
      messageElement.appendChild(line);
    }
  
    chatContainer.appendChild(messageElement);
  
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /********************Script for background************************** */
  