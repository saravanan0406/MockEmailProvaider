Robust Email Sending Service

This project demonstrates a reliable email-sending system built with JavaScript. It’s designed to handle errors gracefully, 
ensuring emails are delivered successfully using retries, fallback providers,
and rate limiting. Mock providers simulate email-sending behavior for demonstration purposes.

Key Features

Retry with Exponential Backoff: Automatically retries failed emails, gradually increasing the delay between attempts.
Fallback Providers: Switches to a secondary email provider if the primary one fails.
Idempotency: Ensures the same email is not sent more than once by leveraging unique email IDs.
Rate Limiting: Controls the number of emails processed per second to prevent overloading.
Status Tracking: Provides real-time tracking for each email, showing whether it succeeded, failed, or is retrying.
Bonus Capabilities
Mock Providers: Simulates email providers with configurable success rates for testing.
Queue System: Organizes email processing in manageable batches for efficiency.
Logging: Tracks the sending process, including retries and failures, for better visibility.
Tools and Technologies
JavaScript (ES6+)
Node.js for running the application
Setup Instructions
Clone this repository:

bash
git clone https://github.com/your-username/robust-email-service.git
cd robust-email-service
Install any required dependencies (if applicable):

bash
npm install

How to Use
Navigate to the project directory and open the code in your editor of choice.

To run the program:

bash
Copy code
node MockEmailProvider.js
Edit the emails array in MockEmailProvider.js to test the system with your own email data.

How It Works
Mock Email Providers
The service uses mock providers (MockEmailProvider) that simulate sending emails. You can configure their success rates to mimic real-world scenarios.

Email Service Class
The main service manages:

Retries with exponential backoff for failed sends.
Switching providers automatically when a provider fails.
Processing emails in rate-limited batches.
Ensuring idempotency by rejecting duplicate email attempts.
Tracking the status of each email.
Example in Action

Input Example
javascript
const emails = [
  { id: "101", to: "user1@example.com", subject: "Welcome", body: "Welcome email body" },
  { id: "102", to: "user2@example.com", subject: "Reminder", body: "Don't forget to check this out!" },
];

Output Example

Email 101 status: { status: 'success', attempts: 1 }
Email 102 status: { status: 'success', attempts: 2 }

Contributions
Have ideas to improve this project? Feel free to fork the repository and submit a pull request. Suggestions and bug reports are welcome via the Issues tab.

License
This project is available under the MIT License.

Creator
Developed by Saravanan M.
