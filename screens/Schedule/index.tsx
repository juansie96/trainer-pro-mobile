import { ScrollView, View } from 'react-native';
import SectionText from '../../components/atoms/SectionText';

const Schedule = () => {
  return <ScrollView style={{ flex: 1 }}>
    <View style={{ paddingHorizontal: 15 }}>
      <SectionText>Nutrición</SectionText>
    </View>
  </ScrollView>;
};

export default Schedule;
