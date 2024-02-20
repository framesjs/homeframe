import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getPreviousFrame,
  useFramesReducer,
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

  // const validMessage = await validateActionSignature(previousFrame.postBody);

  // console.log(validMessage);

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // then, when done, return next frame
  return (
    <div>
      <a href="https://framesjs.org">frames.js</a> homeframe{" "}
      {process.env.NODE_ENV === "development" ? (
        <Link href="/debug">Debug</Link>
      ) : null}
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
          <FrameButton>←</FrameButton>
        ) : (
          <FrameButton action="link" target="http://framesjs.org/">
            Open docs
          </FrameButton>
        )}
        {state.page < 6 ? (
          <FrameButton>→</FrameButton>
        ) : (
          <FrameButton action="link" target="https://framesjs.org">
            Open frames.js
          </FrameButton>
        )}
      </FrameContainer>
    </div>
  );
}
