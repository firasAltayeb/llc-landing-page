document.getElementById("name").addEventListener("focus", function() {
    clearErrorAndLabel("name");
});

document.getElementById("name").addEventListener("blur", function() {
    const input = document.getElementById("name");
    if (!input.value.trim()) {
        displayLabel("name");
    }
});

document.getElementById("email").addEventListener("focus", function() {
    clearErrorAndLabel("email");
});

document.getElementById("email").addEventListener("blur", function() {
    const input = document.getElementById("email");
    if (!input.value.trim()) {
        displayLabel("email");
    }
});

document.getElementById("message").addEventListener("focus", function() {
    clearErrorAndLabel("message");
});

document.getElementById("message").addEventListener("blur", function() {
    const input = document.getElementById("message");
    if (!input.value.trim()) {
        displayLabel("message");
    }
});


document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form submission initiated.");

    const form = event.target;
    const formData = new FormData(form);

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const successMessage = await response.text();
            alert(successMessage);
            form.reset();
            clearErrorMessages();
        } else {
            const errorData = await response.json();
            displayErrorMessages(errorData.errors);
        }
    } else {
        displayErrorMessages(errors);
    }
});

function validateForm(formData) {
    console.log("validateForm initiated.");
    const errors = {};

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name.trim()) {
        errors["name"] = "Name is required.";
    }
    if (!email.trim()) {
        errors["email"] = "Email is required.";
    } else if (!isValidEmail(email)) {
        errors["email"] = "Invalid email format.";
    }
    if (!message.trim()) {
        errors["message"] = "Message is required.";
    }
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayErrorMessages(errors) {
    for (const fieldName in errors) {
        const errorSpan = document.getElementById(`${fieldName}Error`);
        if (errorSpan) {
            errorSpan.textContent = errors[fieldName];
        }
    }
}

function clearErrorAndLabel(fieldName) {
    const errorSpan = document.getElementById(`${fieldName}Error`);
    const label = document.querySelector(`label[for=${fieldName}]`);
    if (errorSpan) {
        errorSpan.textContent = "";
    }
    if (label) {
        label.style.display = "none";
    }
}

function displayLabel(fieldName) {
    const label = document.querySelector(`label[for=${fieldName}]`);
    if (label) {
        label.style.display = "block";
    }
}

function clearErrorMessages() {
    const errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach(span => {
        span.textContent = "";
    });

    const labels = document.querySelectorAll("label");
    labels.forEach(label => {
        label.style.display = "block";
    });
}
