import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  private encryptionKey = 'your-encryption-key';

  encrypt(data: any): string {
    return AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
  }

  decrypt(encryptedData: string): any {
    const bytes = AES.decrypt(encryptedData, this.encryptionKey);
    return JSON.parse(bytes.toString(enc.Utf8));
  }

}