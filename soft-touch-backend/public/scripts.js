document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('Vzaj01Rejbgvn-ge7'); // Initialize EmailJS with your User ID

    const form = document.getElementById('bookingForm');
    const statusMessage = document.getElementById('statusMessage');


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message'),
            attachment: formData.get('attachment'),
            reply_to: 'idayawaino228@gmail.com', // The salon email
            cc: '', // Add CC email addresses here if needed
            bcc: '' // Add BCC email addresses here if needed
        };

        // Send email to admin
        emailjs.send('service_g92oxqx', 'template_9t55u7o', data)
            .then(response => {
                console.log('Admin email sent successfully', response.status, response.text);
                // Send confirmation email to customer
                return emailjs.send('service_g92oxqx', 'template_q9j1a74', data);
            })
            .then(response => {
                console.log('Customer email sent successfully', response.status, response.text);
                statusMessage.textContent = 'Booking confirmed Successfully! You just recieved the confirmation email';
                form.reset();
            })
            .catch(error => {
                console.error('Error sending email:', error);
                statusMessage.textContent = 'An error occurred. Please try again.';
            });
    });

    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
});
