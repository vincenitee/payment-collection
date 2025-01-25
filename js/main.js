import { generateUniqueId } from "./utils.js";

document.addEventListener('alpine:init', () => {
    Alpine.store('payments', {
        students: [],
        studentName: '',
        amount: 0,

        processPayment() {
            const paymentData = {
                paymentId: generateUniqueId('student'),
                studentName: this.studentName,
                amount: this.amount,
            };

            const payments = JSON.parse(localStorage.getItem('payments')) || [];
            payments.push(paymentData);
            localStorage.setItem('payments', JSON.stringify(payments));

            this.resetFields();
        },

        resetFields() {
            this.studentName = '';
            this.amount = 0;
        }
    });
});