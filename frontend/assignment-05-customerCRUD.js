
// C - CREATE -- function to create a CUSTOMER
// take in form data, send form data to backend with AJAX and jQuery
$(document).ready(function() {
    //event listener for the "Create User" button
    console.log("Customer: Create document is ready");
    $('#C-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Create Customer button clicked");

        // Validate form data
        var isValid = validateForm();
        if (!isValid) {
            console.log("Form validation failed. Please fill out all mandatory fields.");
            alert("Form validation failed. Please fill out all mandatory fields.");
            return; // Exit function if form is not valid
        } else {
            console.log("Form validation passed. Now collecting the form data.");
        }

        // collect form data
        var formData = {
            title: $('#selectbasic').val(),
            firstName: $('#C-firstName').val(),
            surname: $('#C-surname').val(),
            mobile: $('#C-mobile').val(),
            emailAddress: $('#C-email').val(),
            homeAddress: {
                addressLine1: $('#C-H-AddressLine1').val(),
                addressLine2: $('#C-H-AddressLine2').val(),
                town: $('#C-H-Town').val(),
                county: $('#C-H-CountyCity').val(),
                EIRCODE: $('#C-H-Eircode').val()
            },
            shippingAddress: {
                addressLine1: $('#C-S-AddressLine1').val(),
                addressLine2: $('#C-S-AddressLine2').val(),
                town: $('#C-S-Town').val(),
                county: $('#C-S-CountyCity').val(),
                EIRCODE: $('#C-S-Eircode').val()
            }
        };  
        console.log(formData); // Log the formData object to see the data inputted


        clearSearch(); // Clear the in-page page console


        // Send AJAX request
        $.ajax({
            url: 'http://localhost:5555/customer', // Update the URL with your backend route
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {

                //Extract firstName and surname from response
                var firstName = response.firstName;
                var surname = response.surname;
                
                //Construct success message
                var successMessage = `Customer "${firstName} ${surname}" created successfully!`;

                // Handle success response
                alert(successMessage); // Show success message
                
                // Clear form fields
                $('#selectbasic').val('Mx');
                $('#C-firstName').val('');
                $('#C-surname').val('');
                $('#C-mobile').val('');
                $('#C-email').val('');
                $('#C-H-AddressLine1').val('');
                $('#C-H-AddressLine2').val('');
                $('#C-H-Town').val('');
                $('#C-H-CountyCity').val('');
                $('#C-H-Eircode').val('');
                $('#C-S-AddressLine1').val('');
                $('#C-S-AddressLine2').val('');
                $('#C-S-Town').val('');
                $('#C-S-CountyCity').val('');
                $('#C-S-Eircode').val('');
            },
            error: function(error) {
                // Handle error
                console.error('Error:', error);
                alert('Error creating user. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#selectbasic', '#C-firstName', '#C-surname', '#C-email', '#C-H-AddressLine1', '#C-H-Town', '#C-H-CountyCity', '#C-S-AddressLine1', '#C-S-Town', '#C-S-CountyCity'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                alert('Please fill out all mandatory fields.');
                return false; // Form is not valid
            }
        }
        return true; // Form is valid
    }
});

/*-------------------------------------------------------------------*/

// R - RETRIEVE -- CUSTOMER retrieve functions

// Function to clear search
function clearSearch() {
    // clear the search input fields
    document.getElementById('firstName').value = '';
    document.getElementById('surname').value = '';

    //clear the userlist
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
}

// Function to get all the users using jQuery AJAX -- Uses the server.get('/customer') route 
function retrieveAllUsers() {
    console.log("Customer: Retrieve All is called");
    $.ajax({
        url: 'http://localhost:5555/customer',
        method: 'GET' ,
        dataType: 'json',
        success: function(usersData){
            console.log(usersData); //console.log the fetch data
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous results
            
            // convert userData to a stringified JSON and display it
            const jsonString = JSON.stringify(usersData, null, 4);
            userList.textContent = jsonString;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}


// Function to retrieve a random user and display it in the userList
function displayRandomUser() {
    $.ajax({
        url: 'http://localhost:5555/customer/random',
        method: 'GET',
        dataType: 'json',
        success: function(randomUser){
            console.log(randomUser); // Log the fetched random user data
            const userList = $('#userList');
            userList.empty(); // Clear previous results

            // convert userData to a stringified JSON and display it
            const jsonString = JSON.stringify(randomUser, null, 4);
            userList.text(jsonString);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}


// Function to search users using jQuery AJAX based on first name and last name and get results
function retrieveMatchingUsers() {
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;

    $.ajax({
        url:`http://localhost:5555/customer/matchingUsers?firstName=${firstName}&surname=${surname}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data); //log the fetch data
            const userList = $('#userList');
            userList.empty(); // Clear previous results

            // Check if no users matched the search
            if (data.length === 0) {
                userList.text("No customer matches your search. Ensure correct spelling and case-sensitive search.");
            } else {
                // convert userData to a stringified JSON and display it
                const jsonString = JSON.stringify(data, null, 4);
                userList.text(jsonString);
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });    
}

/*-------------------------------------------------------------------*/

// U - UPDATE -- CUSTOMER Update function

// Function to update a RANDOM CUSTOMER
$(document).ready(function() {
    // Event listener for the "Update User" button
    console.log("Customer: Update document is ready");
    $('#U-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Update Customer button clicked");

        // Validate form data
        var isValid = validateForm();
        if (!isValid) {
            console.log("Form validation failed. Please fill out all mandatory fields.");
            alert("Form validation failed. Please fill out all mandatory fields.");
            return; // Exit function if form is not valid
        } else {
            console.log("Form validation passed. Now collecting the form data.");
        }

        // Collect form data
        var formData = {
            title: $('#U-selectbasic').val(),
            firstName: $('#U-firstName').val(),
            surname: $('#U-surname').val(),
            mobile: $('#U-mobile').val(),
            emailAddress: $('#U-email').val(),
            homeAddress: {},
            shippingAddress: {}
        };

        // Home address data
        var homeAddressLine1 = $('#U-H-AddressLine1').val();
        if (homeAddressLine1 === '') {
            formData.homeAddress.addressLine1 = $('#U-H-AddressLine1').data('existing-value');
        } else {
            formData.homeAddress.addressLine1 = homeAddressLine1;
        }

        var homeAddressLine2 = $('#U-H-AddressLine2').val();
        if (homeAddressLine2 === '') {
            formData.homeAddress.addressLine2 = $('#U-H-AddressLine2').data('existing-value');
        } else {
            formData.homeAddress.addressLine2 = homeAddressLine2;
        }

        var homeAddressTown = $('#U-H-Town').val();
        if (homeAddressTown === '') {
            formData.homeAddress.town = $('#U-H-Town').data('existing-value');
        } else {
            formData.homeAddress.town = homeAddressTown;
        }

        var homeAddressCountyCity = $('#U-H-CountyCity').val();
        if (homeAddressCountyCity === '') {
            formData.homeAddress.county = $('#U-H-CountyCity').data('existing-value');
        } else {
            formData.homeAddress.county = homeAddressCountyCity;
        }

        var homeAddressEircode = $('#U-H-Eircode').val();
        if (homeAddressEircode === '') {
            formData.homeAddress.EIRCODE = $('#U-H-Eircode').data('existing-value');
        } else {
            formData.homeAddress.EIRCODE = homeAddressEircode;
        }

        // Shipping address data
        var shippingAddressLine1 = $('#U-S-AddressLine1').val();
        if (shippingAddressLine1 === '') {
            formData.shippingAddress.addressLine1 = $('#U-S-AddressLine1').data('existing-value');
        } else {
            formData.shippingAddress.addressLine1 = shippingAddressLine1;
        }

        var shippingAddressLine2 = $('#U-S-AddressLine2').val();
        if (shippingAddressLine2 === '') {
            formData.shippingAddress.addressLine2 = $('#U-S-AddressLine2').data('existing-value');
        } else {
            formData.shippingAddress.addressLine2 = shippingAddressLine2;
        }

        var shippingAddressTown = $('#U-S-Town').val();
        if (shippingAddressTown === '') {
            formData.shippingAddress.town = $('#U-S-Town').data('existing-value');
        } else {
            formData.shippingAddress.town = shippingAddressTown;
        }

        var shippingAddressCountyCity = $('#U-S-CountyCity').val();
        if (shippingAddressCountyCity === '') {
            formData.shippingAddress.county = $('#U-S-CountyCity').data('existing-value');
        } else {
            formData.shippingAddress.county = shippingAddressCountyCity;
        }

        var shippingAddressEircode = $('#U-S-Eircode').val();
        if (shippingAddressEircode === '') {
            formData.shippingAddress.EIRCODE = $('#U-S-Eircode').data('existing-value');
        } else {
            formData.shippingAddress.EIRCODE = shippingAddressEircode;
        }

        console.log(formData); // Log the formData object to see the data inputted

        clearSearch(); //Clear the in-page page console

        // Send AJAX request
        $.ajax({
            url: 'http://localhost:5555/customer/random', //server route for updating random user
            method: 'PUT', // Use PUT method for updating user
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {

                //Extract firstName and surname from response
                var firstName = response.firstName;
                var surname = response.surname;
                
                //Construct success message
                var successMessage = `Randomly generated Customer "${firstName} ${surname}" updated successfully! \nPlease use in-page console 'Clear Search' button to refresh the results.`;

                // Handle success response
                alert(successMessage); // Show success message
                
                // Clear input fields
                $('#U-selectbasic').val('');
                $('#U-firstName').val('');
                $('#U-surname').val('');
                $('#U-mobile').val('');
                $('#U-email').val('');
                $('#U-H-AddressLine1').val('');
                $('#U-H-AddressLine2').val('');
                $('#U-H-Town').val('');
                $('#U-H-CountyCity').val('');
                $('#U-H-Eircode').val('');
                $('#U-S-AddressLine1').val('');
                $('#U-S-AddressLine2').val('');
                $('#U-S-Town').val('');
                $('#U-S-CountyCity').val('');
                $('#U-S-Eircode').val('');

            },
            error: function(error) {
                // Handle error
                console.error('Error:', error);
                alert('Error updating user. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#U-selectbasic', '#U-mobile', '#U-email'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                return false; // Form is not valid
            }
        }
        return true; // Form is valid
    }
});

/*-------------------------------------------------------------------*/

// D - DELETE -- CUSTOMER Delete function

//Function to delete a customer 
$(document).ready(function() {
    // Event listener for the "Delete" button
    console.log("Customer: Delete document is ready");
    $('#D-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Customer: Delete User button clicked");

        // Validate form data
        var isValid = validateForm();
        if (!isValid) {
            console.log("Form validation failed. Please fill out all mandatory fields.");
            alert("Form validation failed. Please fill out all mandatory fields.");
            return; // Exit function if form is not valid
        } else {
            console.log("Form validation passed. Now collecting the form data.");
        }

        // Collect form data
        var formData = {
            firstName: $('#D-firstName').val(),
            surname: $('#D-surname').val(),
            mobile: $('#D-mobile').val(),
            emailAddress: $('#D-emailAddress').val()
        };
        console.log(formData); // Log the formData object to see the data inputted

        //Construct confirmation message with form data
        var confirmationMessage = "Are you sure you want to delete the user: \n" + 
                                    "First Name: " + formData.firstName + "\n" + 
                                    "Surname: " + formData.surname + "\n" +
                                    "Mobile: " + formData.mobile + "\n" +
                                    "Email Address: " + formData.emailAddress + "?";

        // Confirm deletion with user
        var confirmDelete = confirm(confirmationMessage);
        if(!confirmDelete){
            console.log("Deletion canceled by user.");
            return; //Exit the function if deletion is canceled
        }

        clearSearch(); // Clear the in-page page console

        // Send AJAX request to delete user
        $.ajax({
            url: 'http://localhost:5555/customer', // Update the URL with your backend route
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                alert(response.message); // Show success message

                // Clear form fields after successful deletion
                $('#D-firstName').val('');
                $('#D-surname').val('');
                $('#D-mobile').val('');
                $('#D-emailAddress').val('');
            },
            error: function(error) {
                // Handle error response
                console.error('Error:', error);
                alert('Error deleting user. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#D-firstName', '#D-surname', '#D-mobile', '#D-emailAddress'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                alert('Please fill out all mandatory fields.');
                return false; // Form is not valid
            }
        }
        return true; // Form is valid
    }
});

    