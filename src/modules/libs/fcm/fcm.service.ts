import { Inject, Injectable } from '@nestjs/common';
import { FCMOptionsSymbol, TypeFCMOptions } from './types/fcm.type';
import { type Messaging } from 'firebase-admin/lib/messaging/messaging';
import {
  BatchResponse,
  Message,
  MulticastMessage,
} from 'firebase-admin/lib/messaging/messaging-api';

import * as admin from 'firebase-admin';
@Injectable()
export class FCMService {
  private messaging: Messaging;
  constructor(
    @Inject(FCMOptionsSymbol) private readonly options: TypeFCMOptions,
  ) {
    this.messaging = admin
      .initializeApp({
        credential: admin.credential.cert({
          clientEmail: this.options.clientEmail,
          privateKey: this.options.privateKey,
          projectId: this.options.projectId,
        }),
      })
      .messaging();
  }
  public async subscribeTopic(token: string | string[], topic: string) {
    return await this.messaging.subscribeToTopic(token, topic);
  }
  public async unsubscribeTopic(token: string | string[], topic: string) {
    return await this.messaging.unsubscribeFromTopic(token, topic);
  }
  public async sendNotification(
    token: string,
    message: Omit<Message, 'token' | 'topic'>,
  ) {
    return await this.messaging.send({
      token,
      ...message,
    });
  }

  public async sendMulticastNotification(
    tokens: string[],
    message: Omit<MulticastMessage, 'tokens'>,
  ): Promise<BatchResponse> {
    const validTokens = tokens.filter(
      (token) => typeof token === 'string' && token.length > 100,
    );
    if (validTokens.length === 0) {
      throw new Error('Нет допустимых FCM токенов для отправки');
    }
    const response = await this.messaging.sendEachForMulticast({
      tokens,
      ...message,
    });
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        console.warn(
          `Ошибка отправки токена [${tokens[idx]}]:`,
          resp.error?.message,
        );
      }
    });
    return response;
  }

  public async sendTopicNotification(
    topic: string,
    message: Omit<Message, 'token' | 'topic'>,
  ): Promise<string> {
    return await this.messaging.send({
      topic,
      ...message,
    });
  }
}
