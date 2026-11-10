import { isClickOnRecordBoardCardFieldBackground } from '@/object-record/record-board/record-board-card/utils/isClickOnRecordBoardCardFieldBackground';
import { styled } from '@linaria/react';
import { type ReactNode } from 'react';

const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StopPropagationContainer = ({
  children,
  shouldLetBackgroundClicksThrough = false,
}: {
  children: ReactNode;
  shouldLetBackgroundClicksThrough?: boolean;
}) => (
  <StyledFieldContainer
    onClick={(event) => {
      if (
        shouldLetBackgroundClicksThrough &&
        isClickOnRecordBoardCardFieldBackground(event)
      ) {
        return;
      }

      event.stopPropagation();
    }}
  >
    {children}
  </StyledFieldContainer>
);
