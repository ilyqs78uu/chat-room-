// Zone de chat IA
document.getElementById("send-button").addEventListener("click", async function() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Ajouter le message de l'utilisateur à la zone de chat
    const messagesContainer = document.getElementById("messages");
    const userMessage = document.createElement("div");
    userMessage.textContent = "Vous: " + userInput;
    userMessage.classList.add("user-message");
    messagesContainer.appendChild(userMessage);

    // Effacer le champ de saisie
    document.getElementById("user-input").value = "";

    // Appel à l'API IA
    const response = await getAIResponse(userInput);

    // Ajouter la réponse de l'IA à la zone de chat
    const aiMessage = document.createElement("div");
    aiMessage.textContent = "IA: " + response;
    aiMessage.classList.add("ai-message");
    messagesContainer.appendChild(aiMessage);

    // Scroller jusqu'en bas
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Fonction pour obtenir une réponse de l'API IA
async function getAIResponse(userMessage) {
    const apiKey = "TA_CLE_API_OPENAI";  // Remplace par ta clé API OpenAI
    const endpoint = "https://api.openai.com/v1/completions";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    const body = JSON.stringify({
        model: "text-davinci-003",  // Le modèle GPT
        prompt: userMessage,
        max_tokens: 150,
    });

    const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: body,
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
