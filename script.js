async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const responsesDiv = document.getElementById("responses");

    // Show user input
    responsesDiv.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Clear input field
    document.getElementById("userInput").value = "";

    // Send message to the server
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();

    // Display AI response
    responsesDiv.innerHTML += `<p><strong>AI Therapist:</strong> ${data.reply}</p>`;
}