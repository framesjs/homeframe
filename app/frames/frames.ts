import { ClientProtocolHandler, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";

const untrustedDataHandler: ClientProtocolHandler<{
  buttonIndex: any;
  state: any;
}> = {
  isValidPayload(body) {
    const rawBody = body as any;
    return rawBody.untrustedData && rawBody.untrustedData.buttonIndex;
  },
  async getFrameMessage(body) {
    const rawBody = body as any;
    return {
      buttonIndex: rawBody.untrustedData.buttonIndex,
      state: rawBody.untrustedData.state,
    };
  },
};

export const frames = createFrames({
  basePath: "/frames",
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: untrustedDataHandler,
    }),
    openframes({
      clientProtocol: {
        id: "lens",
        version: "1.0.0",
      },
      handler: untrustedDataHandler,
    }),
    openframes({
      clientProtocol: {
        id: "*",
        version: "*",
      },
      handler: untrustedDataHandler,
    }),
  ],
});
