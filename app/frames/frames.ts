import { createFrames } from "frames.js/next";
import { openframes } from "frames.js/middleware";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

export const frames = createFrames({
  basePath: "/frames",
  initialState: {
    page: 1,
  },
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body: JSON) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }

          const result = await getXmtpFrameMessage(body);

          return { ...result };
        },
      },
    }),
  ],
});
