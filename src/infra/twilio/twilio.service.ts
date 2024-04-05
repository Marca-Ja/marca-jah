import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
    private readonly client: twilio.Twilio;

    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendVerificationSMS(phoneNumber: string): Promise<any> {
      const formattedPhoneNumber = this.formatPhoneNumber(phoneNumber);
      
      try {
          const verification = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
              .verifications
              .create({ to: formattedPhoneNumber, channel: 'sms' });
          return verification;
      } catch (error) {
          console.error('Error sending verification SMS:', error);
          throw error;
      }
  }

  async checkVerificationCode(phoneNumber: string, code: string) {
    const formattedPhoneNumber = this.formatPhoneNumber(phoneNumber);
    
    try {
        const verificationCheck = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: formattedPhoneNumber, code: code });
        return verificationCheck;
    } catch (error) {
        console.error('Error checking verification code:', error);
        throw error;
    }
}
  
  private formatPhoneNumber(phoneNumber: string): string {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

      const formattedPhoneNumber = `+55${numericPhoneNumber.replace(/^0+/, '')}`;

      return formattedPhoneNumber;
  }
}
