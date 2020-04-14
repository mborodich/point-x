import React from 'react'
import Pie from 'react-native-pie'
import { Text, View } from 'react-native';

export default (props) => {
  const { activeStep, totalSteps, isComplete } = props;
  const percentage = 100 / totalSteps;
  const sections = Array.from({ length: totalSteps }, (_, i) => {
    const index = i;
    const color = isComplete ? '#FF375F' :
      activeStep === index ? '#BDBDBD' :
        activeStep >= index ? '#FF375F' : '#E0E0E0';

    return {
      percentage,
      color,
    }
  });


  return (
    <View>
      <View style={{
        transform: [
          { rotate: '-4deg' },
        ]
      }}>
        <Pie
          radius={30}
          innerRadius={23}
          sections={sections}
          dividerSize={12}
          strokeCap={'butt'}
          backgroundColor={'#F8F8F8'}
        />
      </View>
      <Text style={{ position: 'absolute', top: '35%', left: '33%' }}>
        {activeStep}/{totalSteps}
      </Text>
    </View>
  )

}
