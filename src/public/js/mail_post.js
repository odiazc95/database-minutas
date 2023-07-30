const emails = <%- JSON.stringify(emails) %>;

function handleEmailInput(event) {
    const input = event.target.value;
    let suggestions = [];
    if (input !== '') {
        suggestions = emails.filter(email => email.includes(input)).slice(0, 1);
    }
    const suggestionsList = document.querySelector('#suggestions');
    suggestionsList.innerHTML = '';
    suggestions.forEach(email => {
    const suggestion = document.createElement('li');
        suggestion.textContent = email;
        suggestion.addEventListener('click', handleSuggestionClick);
        suggestionsList.appendChild(suggestion);
    });
}

function handleSuggestionClick(event) {
    const suggestion = event.target.textContent;
    document.querySelector('#email').value = suggestion;
    document.querySelector('#suggestions').innerHTML = '';
}

function sendEmail() {
    const subject = document.querySelector('input[placeholder="Asunto"]').value;
    const date = document.querySelector('input[placeholder="Fecha"]').value;
    const time = document.querySelector('input[placeholder="Hora"]').value;
    const email = document.querySelector('#email').value;
    fetch('/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, date, time, email })
    });
}