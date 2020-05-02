import React from 'react';
import { FlatList } from "react-native";
import {RewardGridItem, RewardListItem} from '@app/components';


type TProps = {
  navigation: any;
  rewards: any[];
  columnsNum: number;
  count: number;
  theme: any;
};


export const RewardsList = React.memo((props: TProps) => {
  const rewards = React.useMemo(() => {
    return props.rewards;
  }, [props.count, props.rewards && props.rewards.length]);

  const _keyExtractor = React.useCallback((_: any, index: any) => `${index}`, [props.count]);

  const _renderRow = React.useCallback((data: {item: any;}) => {
      const Component = props.columnsNum === 1 ? RewardListItem : RewardGridItem;
      return <Component item={data.item} navigation={props.navigation} />
  }, [props.columnsNum, props.count]);

  return (
    <FlatList
      data={rewards}
      extraData={rewards}
      keyExtractor={_keyExtractor}
      renderItem={_renderRow}
      numColumns={props.columnsNum}
      key={props.columnsNum}
    />
  )
});
