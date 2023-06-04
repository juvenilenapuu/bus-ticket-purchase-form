/*
 * DO NOT CHANGE ANYTHING IN THIS FILE.
 */

function handleSubmission(e) {
    e.preventDefault();

    let passengerTypes = document.querySelectorAll(
        "input[name='passengerType']"
    );
    let passengerType;
    for (let i = 0; i < passengerTypes.length; i++) {
        if (passengerTypes[i].checked) {
            passengerType = passengerTypes[i].nextElementSibling.innerHTML;
        }
    }

    let goingFrom = document.querySelector("#goingFrom").value;
    let goingTo = document.querySelector("#goingTo").value;
    let returnTrip = document.querySelectorAll("input[name='tripType']")[0]
        .checked;
    let departingDate = document.querySelector("#departingDate").value;
    let returningDate = document.querySelector("#returningDate").value; // empty string if disabled
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value;
    let bags = document.querySelector("#bags").value;

    let message = "";
    message += passengerType + " Ticket\n";
    message +=
        "from " + goingFrom + " to " + goingTo + " on " + departingDate + "\n";
    if (returningDate !== "") {
        message +=
            "from " +
            goingTo +
            " to " +
            goingFrom +
            " on " +
            returningDate +
            "\n";
    }
    message += "Passenger: " + firstName + " " + lastName + "\n";
    if (email !== "") {
        message += "Email: " + email + "\n";
    }
    if (phone !== "") {
        message += "Phone: " + phone + "\n";
    }
    message += "Number of Bags: " + bags;
    alert(message);
}

function checkRequirements(errors) {
    let res = true;
    let formElement;
    let temp;

    // check for FORM tag.
    formElement = document.querySelector("form");
    if (formElement === null) {
        errors.push("There must be a FORM tag.");
        return false; // return immediately
    }

    // submit and reset buttons
    if (
        formElement.querySelector("input[type='submit']") === null &&
        formElement.querySelector("button[type='submit']") === null
    ) {
        errors.push("There must be a SUBMIT button.");
        res = false;
    }
    if (
        formElement.querySelector("input[type='reset']") === null &&
        formElement.querySelector("button[type='reset']") === null
    ) {
        errors.push("There must be a RESET button.");
        res = false;
    }

    // passenger types
    temp = formElement.querySelectorAll("input[name='passengerType']");
    if (temp.length !== 4) {
        errors.push(
            "There must be exactly four radio buttons with the name 'passengerType', and one of them must be selected."
        );
        res = false;
    } else if (
        temp[0].type !== "radio" ||
        temp[1].type !== "radio" ||
        temp[2].type !== "radio" ||
        temp[3].type !== "radio"
    ) {
        errors.push(
            "There must be exactly four radio buttons with the name 'passengerType', and one of them must be selected."
        );
        res = false;
    } else if (
        !temp[0].checked &&
        !temp[1].checked &&
        !temp[2].checked &&
        !temp[3].checked
    ) {
        errors.push(
            "There must be exactly four radio buttons with the name 'passengerType', and one of them must be selected."
        );
        res = false;
    } else if (
        temp[0].nextElementSibling.tagName !== "LABEL" ||
        temp[0].nextElementSibling.innerHTML !== "Adult"
    ) {
        errors.push(
            "The first 'passengerType' radio button must be followed by the LABEL 'Adult'."
        );
        res = false;
    } else if (
        temp[1].nextElementSibling.tagName !== "LABEL" ||
        temp[1].nextElementSibling.innerHTML !== "Child"
    ) {
        errors.push(
            "The second 'passengerType' radio button must be followed by the LABEL 'Child'."
        );
        res = false;
    } else if (
        temp[2].nextElementSibling.tagName !== "LABEL" ||
        temp[2].nextElementSibling.innerHTML !== "Senior"
    ) {
        errors.push(
            "The third 'passengerType' radio button must be followed by the LABEL 'Senior'."
        );
        res = false;
    } else if (
        temp[3].nextElementSibling.tagName !== "LABEL" ||
        temp[3].nextElementSibling.innerHTML !== "Student"
    ) {
        errors.push(
            "The fourth 'passengerType' radio button must be followed by the LABEL 'Student'."
        );
        res = false;
    }

    // going from
    temp = formElement.querySelector("select[id='goingFrom']");
    if (temp === null) {
        errors.push(
            "There must be an SELECT tag with ID 'goingFrom', and there must be at least one OPTION tag inside it."
        );
        res = false;
    } else if (temp.querySelectorAll("option").length < 1) {
        errors.push(
            "There must be an SELECT tag with ID 'goingFrom', and there must be at least one OPTION tag inside it."
        );
        res = false;
    }

    // going to
    temp = formElement.querySelector("select[id='goingTo']");
    if (temp === null) {
        errors.push(
            "There must be an SELECT tag with ID 'goingTo', and there must be at least one OPTION tag inside it."
        );
        res = false;
    } else if (temp.querySelectorAll("option").length < 1) {
        errors.push(
            "There must be an SELECT tag with ID 'goingTo', and there must be at least one OPTION tag inside it."
        );
        res = false;
    }

    // return or one-way
    temp = formElement.querySelectorAll("input[name='tripType']");
    if (temp.length !== 2) {
        errors.push(
            "There must be exactly two radio buttons with the name 'tripType', and one of them must be selected."
        );
        res = false;
    } else if (temp[0].type !== "radio" || temp[1].type !== "radio") {
        errors.push(
            "There must be exactly two radio buttons with the name 'tripType', and one of them must be selected."
        );
        res = false;
    } else if (!temp[0].checked && !temp[1].checked) {
        errors.push(
            "There must be exactly two radio buttons with the name 'tripType', and one of them must be selected."
        );
        res = false;
    } else if (
        temp[0].nextElementSibling.tagName !== "LABEL" ||
        temp[0].nextElementSibling.innerHTML !== "Return"
    ) {
        errors.push(
            "The first 'tripType' radio button must be followed by the LABEL 'Return'."
        );
        res = false;
    } else if (
        temp[1].nextElementSibling.tagName !== "LABEL" ||
        temp[1].nextElementSibling.innerHTML !== "One Way"
    ) {
        errors.push(
            "The second 'tripType' radio button must be followed by the LABEL 'One Way'."
        );
        res = false;
    }

    // departing date
    temp = formElement.querySelector("input[id='departingDate']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'departingDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    } else if (temp.type !== "date") {
        errors.push(
            "There must be an input with ID 'departingDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("required")) {
        errors.push(
            "There must be an input with ID 'departingDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    }

    // returning date
    temp = formElement.querySelector("input[id='returningDate']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'returningDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    } else if (temp.type !== "date") {
        errors.push(
            "There must be an input with ID 'returningDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("required")) {
        errors.push(
            "There must be an input with ID 'returningDate'. It must be of type DATE and must have the REQUIRED attribute."
        );
        res = false;
    }

    // passenger first name
    temp = formElement.querySelector("input[id='firstName']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'firstName'. It must have the REQUIRED attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("required")) {
        errors.push(
            "There must be an input with ID 'firstName'. It must have the REQUIRED attribute."
        );
        res = false;
    }

    // passenger last name
    temp = formElement.querySelector("input[id='lastName']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'lastName'. It must have the REQUIRED attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("required")) {
        errors.push(
            "There must be an input with ID 'lastName'. It must have the REQUIRED attribute."
        );
        res = false;
    }

    // passenger email
    temp = formElement.querySelector("input[id='email']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'email'. It must be of type EMAIL."
        );
        res = false;
    } else if (temp.type !== "email") {
        errors.push(
            "There must be an input with ID 'email'. It must be of type EMAIL."
        );
        res = false;
    }

    // passenger phone
    temp = formElement.querySelector("input[id='phone']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'phone'. It must have a PATTERN attribute and a PLACEHOLDER attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("pattern")) {
        errors.push(
            "There must be an input with ID 'phone'. It must have a PATTERN attribute and a PLACEHOLDER attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("placeholder")) {
        errors.push(
            "There must be an input with ID 'phone'. It must have a PATTERN attribute and a PLACEHOLDER attribute."
        );
        res = false;
    }

    // passenger bags
    temp = formElement.querySelector("input[id='bags']");
    if (temp === null) {
        errors.push(
            "There must be an input with ID 'bags'. It must be of type NUMBER and have the REQUIRED attribute."
        );
        res = false;
    } else if (temp.type !== "number") {
        errors.push(
            "There must be an input with ID 'bags'. It must be of type NUMBER and have the REQUIRED attribute."
        );
        res = false;
    } else if (!temp.hasAttribute("required")) {
        errors.push(
            "There must be an input with ID 'bags'. It must be of type NUMBER and have the REQUIRED attribute."
        );
        res = false;
    }

    return res;
}

window.onload = function () {
    let errors = [];
    if (!checkRequirements(errors)) {
        for (let i = 0; i < errors.length; i++) {
            console.log("<< ERROR: " + errors[i] + " >>");
        }
        //alert("Form does not meet specified requirements. See console for errors.");
        return;
    }

    let returningDateInput = document.querySelector("#returningDate");
    document
        .querySelectorAll("input[name='tripType']")[0]
        .addEventListener("click", function (e) {
            returningDateInput.removeAttribute("disabled");
        });
    document
        .querySelectorAll("input[name='tripType']")[1]
        .addEventListener("click", function (e) {
            returningDateInput.setAttribute("disabled", "disabled");
            returningDateInput.value = "";
        });

    document.querySelector("form").addEventListener("submit", handleSubmission);
};
