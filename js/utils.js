export function generateUniqueId(prefix = '') {
    // Get the current timestamp
    const timestamp = Date.now();
    
    // Generate a random number and convert it to a base-36 string
    const randomPart = Math.random().toString(36).substring(2, 10);

    // Combine the prefix, timestamp, and random part
    return `${prefix}${timestamp}${randomPart}`;
}

export function showModal(status, message) {
    Swal.fire({
        title: (status === 'success') ? 'Success' : 'Failure',
        text: message,
        icon: status,
    });
}

export function showConfirmationModal(actionName = 'delete', callback) {
    Swal.fire({
        title: `Are you sure you want to ${actionName}?`,
        text: `This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: `Yes, ${actionName}!`,
        cancelButtonText: 'Cancel',
        
    }).then((result) => {
        if (result.isConfirmed) {
            // Call the callback function if the user confirms
            callback();
            Swal.fire(
                'Deleted!',
                `The ${actionName} action has been completed.`,
                'success'
            );
        }
    });
}
