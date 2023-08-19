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
    console.log("Validation errors:", errors);
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayErrorMessages(errors) {
    for (const fieldName in errors) {
        const errorSpan = document.getElementById(`${fieldName}Error`);
        console.log("Validation errors:", errorSpan);
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
