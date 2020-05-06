import React from 'react';
import { FlatList } from "react-native";
import {RewardGridItem, RewardListItem} from '@app/components';


type TProps = {
  navigation: any;
  rewards: any[];
  columnsNum: number;
  rewardsCount: number;
  partnersCount: number;
  theme: any;
};


export const RewardsList = React.memo((props: TProps) => {
  // const rewards = React.useMemo(() => {
  //   return props.rewards;
  // }, [props.rewardsCount, props.partnersCount, props.rewards && props.rewards.length]);

  const _keyExtractor = React.useCallback((_: any, index: any) => `${index}`, [props.rewardsCount, props.partnersCount]);

  const _renderRow = React.useCallback((data: {item: any;}) => {
      const Component = props.columnsNum === 1 ? RewardListItem : RewardGridItem;
      return <Component item={data.item} navigation={props.navigation} />
  }, [props.rewards, props.columnsNum, props.rewardsCount, props.partnersCount]);

  return (
    <FlatList
      data={props.rewards}
      extraData={props.rewards}
      keyExtractor={_keyExtractor}
      renderItem={_renderRow}
      numColumns={props.columnsNum}
      key={props.columnsNum}
    />
  )
});
