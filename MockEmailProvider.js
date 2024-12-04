class MockEmailProvider {
    constructor(successRate) {
      this.successRate = successRate; 
    }
  
    async send(email) {
      return Math.random() < this.successRate;
    }
  }
  
  class EmailService {
    constructor(providers, maxRetries = 3, rateLimit = 5) {
      this.providers = providers; 
      this.maxRetries = maxRetries; 
      this.rateLimit = rateLimit; 
      this.queue = []; 
      this.statusTracker = new Map(); 
      this.sentEmails = new Set(); 
    }
  
    async delay(attempt) {
      const delayTime = Math.pow(2, attempt) * 100;
      return new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  
    async sendWithRetry(email, providerIndex = 0, attempt = 0) {
      const provider = this.providers[providerIndex];
      this.statusTracker.set(email.id, { status: "retrying", attempts: attempt + 1 });
  
      try {
        const sent = await provider.send(email);
        if (sent) {
          this.statusTracker.set(email.id, { status: "success", attempts: attempt + 1 });
          this.sentEmails.add(email.id); 
          return true;
        } else {
          throw new Error("Provider failed");
        }
      } catch (error) {
        if (attempt < this.maxRetries) {
          await this.delay(attempt);
          return this.sendWithRetry(email, providerIndex, attempt + 1); 
        } else if (providerIndex + 1 < this.providers.length) {
          return this.sendWithRetry(email, providerIndex + 1, 0); 
        } else {
          this.statusTracker.set(email.id, { status: "failed", attempts: attempt + 1, error: error.message });
          return false;
        }
      }
    }
  
    async send(email) {
      if (this.sentEmails.has(email.id)) {
        console.log(`Duplicate email detected: ${email.id}`);
        return false; 
      }
  
      this.queue.push(email); 
      const result = await this.processQueue();
      return result;
    }
  
    async processQueue() {
      if (this.queue.length > 0) {
        const emailBatch = this.queue.splice(0, this.rateLimit); 
        const promises = emailBatch.map((email) => this.sendWithRetry(email));
        const results = await Promise.all(promises);
        return results;
      }
    }
  
    getEmailStatus(emailId) {
      return this.statusTracker.get(emailId);
    }
  }
  
  (async () => {
    
    const provider1 = new MockEmailProvider(0.5); 
    const provider2 = new MockEmailProvider(0.8); 
  
    const emailService = new EmailService([provider1, provider2]);
  
    const emails = [
      { id: "1", to: "sarovijayms@gmail.com.com", subject: "Hello", body: "Test email 1" },
      { id: "2", to: "20110086@hicet.ac.in", subject: "Hello", body: "Test email 2" },
      { id: "3", to: "20110096@hicet.ac.in", subject: "Hello", body: "Test email 3" },
    ];
  
    for (const email of emails) {
      await emailService.send(email);
      console.log(`Email ${email.id} status:`, emailService.getEmailStatus(email.id));
    }
  })();
  