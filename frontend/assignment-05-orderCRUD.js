
// C - CREATE an ORDER
$(document).ready(function() {
    console.log("Order: Create document is ready");
    // Event listener for form submission
    $('#createOrderButton').click(function(event) {
        console.log("Create Order button clicked");
        // Prevent the default form submission behavior
        event.preventDefault();

        // Validate form data
        var isValid = validateOrderForm();
        if (!isValid) {
            console.log("Order form validation failed. Please fill out all mandatory fields.");
            alert("Order form validation failed. Please fill out all mandatory fields.");
            return; // Exit function if form is not valid
        }

        // Get the form data
        var formData = {
            customer: $('#C-Order-customer').val(),
            items: [{
                mobilePhone: $('#C-Order-mobilePhone').val(),
                quantity: $('#C-Order-quantity').val()
            }]
        };

        console.log(formData);

        // Send the AJAX request
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5555/order',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                // Handle successful response
                console.log('Order created successfully:', response);
                alert("Order created successfully!");
                
                // Clear form fields
                $('#C-Order-customer').val('');
                $('#C-Order-mobilePhone').val('');
                $('#C-Order-quantity').val('');
            },
            error: function(error) {
                // Handle errors
                console.error('Error creating order:', error);
                alert('Error creating order. Please try again.');
            }
        });
    });

    // Function to validate form data
    function validateOrderForm() {
        // Check if any mandatory fields are empty
        var mandatoryFields = ['#C-Order-customer', '#C-Order-mobilePhone', '#C-Order-quantity'];
        for (var i = 0; i < mandatoryFields.length; i++) {
            if ($(mandatoryFields[i]).val() === '') {
                alert('Please fill out all mandatory fields.');
                return false; // Form is not valid
            }
        }

        // Validate quantity to ensure it's a number
        var quantity = $('#C-Order-quantity').val();
        if (isNaN(quantity)) {
            alert('Quantity must be a number.');
            return false; // Form is not valid
        }

        return true; // Form is valid
    }
});

// R - RETRIEVE all ORDERs
function retrieveAllOrders() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5555/order', 
        success: function(response) {
            // Handle successful response
            console.log('Orders retrieved successfully:', response);
            $('#OrderList').val(JSON.stringify(response));
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('Error retrieving orders:', error);
            $('#OrderList').val('Error: ' + error);
        }
    });
}

// R - RETRIEVE by ORDER ID
function retrieveOrder(orderId) {

     // Check if ORDER ID input is blank
     if (!orderId.trim()) {
        // Display message in in-page console
        $('#OrderList').val('Please enter an ORDER ID.');
        return; // Exit the function early
    }

        // Check if the input is a valid MongoDB ID
        if (orderId.length !== 24) {
            // Display message in in-page console
            $('#OrderList').val('Please enter a valid ORDER ID.');
            return; // Exit the function early
        }

    $.ajax({
        type: 'GET',
        url: 'http://localhost:5555/order/' + orderId,
        success: function(response) {
            // Handle successful response
            if (!response) {
                $('#OrderList').val('No order found with the provided ID.');
            } else {
                console.log('Order retrieved successfully:', response);
                $('#OrderList').val(JSON.stringify(response));
            }
        },
        error: function(error) {
            // Handle error
            console.error('Error retrieving order:', error);
            $('#OrderList').val('Error: ' + error);
        }
    });
}

// R - function to clear the search results
function clearSearchOrders() {
    // Clear the textarea with id "OrderList" and search input
    $('#OrderList').val('');
    $('#R-Order').val('');
}

// R - RETRIEVE to retrieve a random order
function displayRandomOrder() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5555/order/random',
        success: function(response) {
            // Handle successful response
            console.log('Random order retrieved successfully:', response);
            $('#OrderList').val(JSON.stringify(response));
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('Error retrieving random order:', error);
            $('#OrderList').val('Error: ' + error);
        }
    });
}

// U - Update an Order
$(document).ready(function() {
    console.log("Order: Update document is ready");

    $('#updateOrderButton').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the form data
        var formData = {
            orderID: $('#U-Order-orderID').val(),
            customer: $('#U-Order-customer').val(),
            items: [
                {
                    mobilePhone: $('#U-Order-mobilePhone').val(),
                    quantity: $('#U-Order-quantity').val()
                }
            ]
        };

        // Send AJAX request to update the order
        $.ajax({
            url: 'http://localhost:5555/order/' + formData.orderID,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                alert(response.message); // Show success message
            },
            error: function(error) {
                // Handle error response
                console.error('Error:', error);
                alert('Error updating order. Please try again.'); // Show error message
            }
        });
    });
});


// D - DELETE order by ID
$(document).ready(function() {
    console.log("Order: Delete document is ready");
    $('#D-Order-button').on('click', function() {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Order: Delete Order button clicked");

        // Get the order ID from the input field
        var orderId = $('#D-Order').val();

        // Validate the order ID
        if (!orderId.trim()) {
            alert("Please enter an ORDER ID.");
            return; // Exit function if order ID is not provided
        }

        // Confirm deletion with user
        var confirmDelete = confirm("Are you sure you want to delete the order with ID: " + orderId + "?");
        if(!confirmDelete){
            console.log("Deletion canceled by user.");
            return; //Exit the function if deletion is canceled
        }

        // Send AJAX request to delete order
        $.ajax({
            url: 'http://localhost:5555/order/' + orderId,
            method: 'DELETE',
            success: function(response) {
                // Handle success response
                alert(response.message); // Show success message

                // Clear the order ID input field after successful deletion
                $('#D-Order').val('');
            },
            error: function(error) {
                // Handle error response
                console.error('Error:', error);
                alert('Error deleting order. Please try again.');
            }
        });
    });
});