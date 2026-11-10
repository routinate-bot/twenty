import { useActiveRecordBoardCard } from '@/object-record/record-board/hooks/useActiveRecordBoardCard';
import { useFocusedRecordBoardCard } from '@/object-record/record-board/hooks/useFocusedRecordBoardCard';
import { RecordBoardCardContext } from '@/object-record/record-board/record-board-card/contexts/RecordBoardCardContext';
import { RecordBoardComponentInstanceContext } from '@/object-record/record-board/states/contexts/RecordBoardComponentInstanceContext';
import { useOpenRecordFromIndexView } from '@/object-record/record-index/hooks/useOpenRecordFromIndexView';
import { useAvailableComponentInstanceIdOrThrow } from '@/ui/utilities/state/component-state/hooks/useAvailableComponentInstanceIdOrThrow';
import { useContext } from 'react';

export const useOpenRecordBoardCard = () => {
  const { recordId, rowIndex, columnIndex } = useContext(
    RecordBoardCardContext,
  );

  const recordBoardId = useAvailableComponentInstanceIdOrThrow(
    RecordBoardComponentInstanceContext,
  );

  const { openRecordFromIndexView } = useOpenRecordFromIndexView();
  const { activateBoardCard } = useActiveRecordBoardCard(recordBoardId);
  const { unfocusBoardCard } = useFocusedRecordBoardCard(recordBoardId);

  const openRecordBoardCard = () => {
    activateBoardCard({ rowIndex, columnIndex });
    unfocusBoardCard();
    openRecordFromIndexView({ recordId });
  };

  return { openRecordBoardCard };
};
