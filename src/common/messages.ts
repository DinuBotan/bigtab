import { messages } from '@extend-chrome/messages';

export const sendContext = async <T>(context: T) => {
  await messages.send({
    greeting: 'CONTEXT',
    data: context,
  });
};

export const contextStream = {
  subscribe: <T>(subscriber: (data: T) => void | Promise<void>) => {
    messages.on(async (message: { greeting: string; data: T }) => {
      if (message.greeting === 'CONTEXT') {
        await subscriber(message.data);
      }
    });
  },
};
