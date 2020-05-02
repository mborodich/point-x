import React from 'react';
import { FlatList } from 'react-native';
import { HistoryItem } from '@app/components';


type TProps = {
  history: any[];
  count: number;
  onClick: () => void;
};

export const HistoryList = React.memo((props: TProps) => {
  const _renderRow = React.useCallback((data: {item: any; index: number;}) => {
    return <HistoryItem item={data.item} key={data.index} onClick={props.onClick} />
  }, [props.count || 0]);

  return (
    <FlatList data={props.history || []} renderItem={_renderRow} />
  );
});
