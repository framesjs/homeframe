import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  getPreviousFrame,
  useFramesReducer,
  validateActionSignature,
} from "frames.js/next/server";
import Link from "next/link";

type State = {
  page: number;
};

const initialState = { page: 1 };

const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData.buttonIndex;
  return {
    page:
      state.page === 1 && buttonIndex === 1
        ? 2
        : buttonIndex === 1
        ? state.page - 1
        : buttonIndex === 2
        ? state.page + 1
        : 1,
  };
};

const lastPage = 6;

// This is a react server component only
export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const validMessage = await validateActionSignature(previousFrame.postBody);

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // then, when done, return next frame
  return (
    <div>
      Starter kit. <Link href="/debug">Debug</Link>
      <FrameContainer
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          src={
            state.page === 1
              ? "http://framesjs.org/og.png"
              : `http://framesjs.org/frames/frame${state.page}.png`
          }
        />
        {state.page !== 1 ? (
          <FrameButton onClick={dispatch}>←</FrameButton>
        ) : null}
        {state.page < 6 ? (
          <FrameButton onClick={dispatch}>→</FrameButton>
        ) : (
          <FrameButton href="https://framesjs.org">Open frames.js</FrameButton>
        )}
      </FrameContainer>
    </div>
  );
}
