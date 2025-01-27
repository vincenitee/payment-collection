import { generateUniqueId, showConfirmationModal, showModal } from "./utils.js";

// Initializes the feather icons
feather.replace();

document.addEventListener('alpine:init', () => {
    Alpine.store('payments', {
        studentName: '',

        amountPaid: (() => {
            const storedValue = localStorage.getItem('baseAmount');
            return storedValue !== null && !isNaN(parseFloat(storedValue)) 
                ? parseFloat(storedValue) 
                : 20;
        })(),

        processPayment() {
            const paymentData = {
                id: generateUniqueId('student'),
                name: this.studentName,
                amount: this.amountPaid,
                date: new Date().toLocaleString(),
            };

            Alpine.store('records').addPayment(paymentData);

            showModal('success', 'Payment recorded successfully');
            
            this.studentName = '';
        },

        updateBaseAmount(amount) {
            if (amount <= 0) {
                showModal('error', 'Base amount must be greater than 0')
                return;
            }

            // Inserts the value to the local storage
            localStorage.setItem('baseAmount', parseFloat(amount))

            // Show a success message
            showModal('success', 'Base amount has been updated successfully!')

            this.amountPaid;
        }
    });

    Alpine.store('records', {
        payments: [],
        filteredPayments: [],
        search: 'asd',

        retrieveAll() {
            const payments = JSON.parse(localStorage.getItem('payments')) || [];

            // Sort by date
            payments.sort((a, b) => new Date(b.date) - new Date(a.date));

            this.payments = payments;
            this.filteredPayments = payments; // Initialize filteredPayments with all payments
        },

        addPayment(paymentData) {
            // Add payment to the store's payments array
            this.payments.push(paymentData);
            localStorage.setItem('payments', JSON.stringify(this.payments));
            this.retrieveAll(); // Re-fetch and sort the payments after adding
        },

        delete(id) {
            showConfirmationModal('delete this payment', () => {
                let payments = this.payments.filter(payment => payment.id !== id);

                localStorage.setItem('payments', JSON.stringify(payments));

                this.retrieveAll();

                showModal('success', 'Payment deleted successfully');
            })
        },

        deleteAll() {
            showConfirmationModal('delete all records', () => {
                localStorage.clear();

                this.retrieveAll();

                showModal('success', 'All payments deleted successfully');      
            })
        },

        filterPayments() {
            if (this.search === '') {
                this.filteredPayments = this.payments; // Show all payments if no search term
                return; // Early return to avoid further processing
            }

            // Update the filteredPayments array
            this.filteredPayments = this.payments.filter(payment =>
                payment.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },

        // Computed Property: Get the count of paid students
        get paidStudentCount() {
            return this.payments.length; // Always use the original payments array
        },

        // Computed Property: Get the total amount of payments
        get totalPayments() {
            return this.payments.reduce((total, payment) => total + parseInt(payment.amount), 0);
        },
    });


});
