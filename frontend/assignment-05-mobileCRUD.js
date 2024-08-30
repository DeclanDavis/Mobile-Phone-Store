
// CREATE MOBILE 
$(document).ready(function() {

    console.log("Mobile: Create document is ready");
    $('#C-mobile-button').on('click', function() {
        console.log("Mobile: Create button clicked");
        event.preventDefault();

        // Validate form data
        var isValid = validateForm();
        if (!isValid) {
            console.log("Form validation failed. Please fill out all mandatory fields.");
            alert("Form validation failed. Please fill out all mandatory fields.");
            return; // Exit function if form is not valid
        }

        // Collect form data
        var formData = {
            manufacturer: $('#C-Manufacturer').val(),
            model: $('#C-Model').val(),
            price: parseFloat($('#C-Price').val()) // Convert price to float
        };

        console.log(formData);

        // Send AJAX request
        $.ajax({
            url: 'http://localhost:5555/mobilePhone',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert("Mobile phone created successfully!");
                // Clear form fields if needed
                $('#C-Manufacturer').val('');
                $('#C-Model').val('');
                $('#C-Price').val('');
            },
            error: function(error) {
                console.error('Error:', error);
                alert('Error creating mobile phone. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#C-Manufacturer', '#C-Model', '#C-Price'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                alert('Please fill out all mandatory fields.');
                return false; // Form is not valid
            }
        }

        // Validate price to ensure it's a number
        var price = $('#C-Price').val();
        if (isNaN(price)) {
            alert('Price must be a number format e.g 99.99.');
            return false; // Form is not valid
        }

        return true; // Form is valid
    }
});

// RETRIEVE MOBILE functions

// Function to clear search for mobile phones
function clearSearchMobiles() {
    // Clear the search input fields for manufacturer and model
    $('#R-Manufacturer').val('');
    $('#R-Model').val('');

    // Clear the mobile list
    const mobileList = $('#mobileList');
    mobileList.empty();
}

// Function to retrieve all mobile phones using jQuery AJAX
function retrieveAllMobiles() {
    console.log("Mobile: Retrieve All is called");
    $.ajax({
        url: 'http://localhost:5555/mobilePhone',
        method: 'GET',
        dataType: 'json',
        success: function(mobilesData) {
            console.log(mobilesData); // Log the fetched data
            const mobileList = document.getElementById('mobileList');
            mobileList.innerHTML = ''; // Clear previous results

            // Convert mobilesData to a stringified JSON and display it
            const jsonString = JSON.stringify(mobilesData, null, 4);
            mobileList.textContent = jsonString;
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

// Function to retrieve a random mobile and display it in the mobileList
function displayRandomMobile() {
    console.log("Random mobile called");
    $.ajax({
        url: 'http://localhost:5555/mobilePhone/random',
        method: 'GET',
        dataType: 'json',
        success: function(randomMobile) {
            console.log(randomMobile); // Log the fetched random mobile data
            const mobileList = $('#mobileList');
            mobileList.empty(); // Clear previous results

            // Convert randomMobile data to a stringified JSON and display it
            const jsonString = JSON.stringify(randomMobile, null, 4);
            mobileList.text(jsonString);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

// Function to search mobile phones using jQuery AJAX based on manufacturer and model and get results
function retrieveMatchingMobiles() {
    const manufacturer = $('#R-Manufacturer').val();
    const model = $('#R-Model').val();

    $.ajax({
        url: `http://localhost:5555/mobilePhone/matchingMobiles?manufacturer=${manufacturer}&model=${model}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Log the fetched data
            const mobileList = $('#mobileList');
            mobileList.empty(); // Clear previous results

            // Check if no mobile phones matched the search
            if (data.length === 0) {
                mobileList.text("No mobile phone matches your search. Ensure correct spelling and case-sensitive search.");
            } else {
                // Convert data to a stringified JSON and display it
                const jsonString = JSON.stringify(data, null, 4);
                mobileList.text(jsonString);
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });    
}

// U - UPDATE -- MOBILE Update function
// Function to update a MOBILE
$(document).ready(function() {
    // Event listener for the "Update Mobile" button
    console.log("Mobile: Update document is ready");
    $('#U-mobile-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Update Mobile button clicked");

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
            manufacturer: $('#U-mobile-Manufacturer').val(),
            model: $('#U-mobile-Model').val(),
            price: parseFloat($('#U-mobile-Price').val()) // Convert price to float
        }; 

        console.log(formData); // Log the formData object to see the data inputted

        
        // Send AJAX request
        $.ajax({
            url: 'http://localhost:5555/mobilePhone/' + $('#U-mobile-ID').val(), //server route for updating mobile phone
            method: 'PUT', // Use PUT method for updating mobile phone
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                var alertMessage = "Mobile phone updated successfully!\n" +
                "Old Mobile Phone: " + JSON.stringify(response.oldMobilePhone) + "\n" +
                "Updated Mobile Phone: " + JSON.stringify(response.updatedMobilePhone);
                
                alert(alertMessage); // Show success message with details of old and updated mobile phones

                // Clear input fields after successful update
                $('#U-mobile-Manufacturer').val('');
                $('#U-mobile-Model').val('');
                $('#U-mobile-Price').val('');
                
            },
            error: function(error) {
                // Handle error
                console.error('Error:', error);
                alert('Error updating mobile phone. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#U-mobile-ID', '#U-mobile-Manufacturer', '#U-mobile-Model', '#U-mobile-Price'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                return false; // Form is not valid
            }
        }
        return true; // Form is valid
    }
});


// D- DELETE -- Function to delete a mobile phone
$(document).ready(function() {
    // Event listener for the "Delete" button
    console.log("Mobile: Delete document is ready");
    $('#D-Mobile-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Mobile: Delete button clicked");

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
            manufacturer: $('#D-Manufacturer').val(),
            model: $('#D-Model').val(),
            price: parseFloat($('#D-Price').val()) // Convert price to float
        }; 

        console.log(formData); // Log the formData object to see the data inputted

        // Construct confirmation message with form data
        var confirmationMessage = "Are you sure you want to delete the mobile phone: \n" + 
                                    "Manufacturer: " + formData.manufacturer + "\n" + 
                                    "Model: " + formData.model + "\n" +
                                    "Price: " + formData.price + "?";

        // Confirm deletion with user
        var confirmDelete = confirm(confirmationMessage);
        if(!confirmDelete){
            console.log("Deletion canceled by user.");
            return; // Exit the function if deletion is canceled
        }

        // Send AJAX request to delete mobile phone
        $.ajax({
            url: 'http://localhost:5555/mobilePhone', // Update the URL with your backend route
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                alert(response.message); // Show success message

                // Clear form fields after successful deletion
                $('#D-Manufacturer').val('');
                $('#D-Model').val('');
                $('#D-Price').val('');
            },
            error: function(error) {
                // Handle error response
                console.error('Error:', error);
                alert('Error deleting mobile phone. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#D-Manufacturer', '#D-Model', '#D-Price'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                alert('Please fill out all mandatory fields.');
                return false; // Form is not valid
            }
        }
        return true; // Form is valid
    }
});
