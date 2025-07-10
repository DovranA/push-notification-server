import { Inject, Injectable } from '@nestjs/common';
import { FCMOptionsSymbol, TypeFCMOptions } from './types/fcm.type';
import { type Messaging } from 'firebase-admin/lib/messaging/messaging';
import {
  BatchResponse,
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

  public async sendNotification({
    token,
    title,
    body,
    icon,
  }: {
    token: string;
    title: string;
    body: string;
    icon?: string;
  }): Promise<string> {
    return await this.messaging.send({
      token,
      webpush: {
        notification: { title, body, icon },
      },
    });
  }

  public async sendNotificationMultipleTokens({
    tokens,
    title,
    body,
    imageUrl,
  }: {
    tokens: string[];
    title: string;
    body: string;
    imageUrl?: string;
  }): Promise<BatchResponse> {
    const messages: MulticastMessage = {
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
    };
    return await this.messaging.sendEachForMulticast(messages);
  }

  public async sendTopicNotification({
    topic,
    title,
    body,
    imageUrl,
  }: {
    topic: string;
    title: string;
    body: string;
    imageUrl?: string;
  }): Promise<string> {
    return await this.messaging.send({
      topic,
      notification: { title, body, imageUrl },
    });
  }
}
