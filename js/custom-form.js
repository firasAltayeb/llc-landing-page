document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const successMessage = await response.text();
        alert(successMessage);
        // You can also reset the form here if needed
        form.reset();
        clearErrorMessages();
    } else {
        const errorData = await response.json();
        displayErrorMessages(errorData.errors);
    }
});

function displayErrorMessages(errors) {
    for (const fieldName in errors) {
        const errorSpan = document.getElementById(`${fieldName}Error`);
        if (errorSpan) {
            errorSpan.textContent = errors[fieldName];
        }
    }
}

function clearErrorMessages() {
    const errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach(span => {
        span.textContent = "";
    });
}
