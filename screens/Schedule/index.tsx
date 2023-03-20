import { ScrollView, View } from 'react-native';
import SectionText from '../../components/atoms/SectionText';
import TPText from '../../components/atoms/TPText';
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from 'react';
import { useUser } from '../../hooks';
import dayjs from 'dayjs';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const days = ['D','L','M','X','J','V','S']

const getDateRefreshed = (date?: Date) => new Date(new Date(date ? date : new Date()).toJSON().slice(0,10))

function getWeekDates(date: Date) {
  const week = []; 
  // Starting Monday not Sunday
  date.setDate((date.getDate() - date.getDay() + 1));
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(date)
    ); 
    date.setDate(date.getDate() +1);
  }
  return week; 
}

export const getDateIncreasedByNWeeks = (date: Date, weeks: number) => {
  const newDate = new Date(date)
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000
  newDate.setTime(newDate.getTime() + weekInMilliseconds * weeks)
  return newDate
}

const Schedule = () => {
  const [weekNumber, setWeekNumber] = useState(0)
  const [selectedDate, setSelectedDate] = useState(getDateRefreshed())
  const dates = getWeekDates(getDateIncreasedByNWeeks(new Date(), weekNumber))
  const selectedMonth = months[dates[0].getMonth()]
  const selectedYear = months[dates[0].getFullYear()]
  const selectedWeekFirstDay = dates[0].getDate()
  const selectedWeekLastDay = dates[6].getDate()
  const { user, isFetching, error, fetchUserData } = useUser();

  const tasks = user?.tasks && user.tasks
    ? user.tasks.filter(
      (t) =>
        dayjs(t.date).format("DD/MM/YYYY") ===
        dayjs(selectedDate).format("DD/MM/YYYY")
    )
    : null

  console.log('tasks', tasks)

  return <ScrollView style={{ flex: 1 }}>
    <View style={{ paddingHorizontal: 15 }}>
      <SectionText>Nutrición</SectionText>
      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Entypo
          name="chevron-thin-left"
          size={28}
          onPress={() => setWeekNumber(weekNumber - 1)}
        />
        <TPText bold>{selectedMonth} {selectedYear} - Semana {selectedWeekFirstDay} al {selectedWeekLastDay}</TPText>
        <Entypo
          name="chevron-thin-right"
          size={28}
          onPress={() => setWeekNumber(weekNumber + 1 )}
        />
      </View>
    </View>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10, padding: '0 10px', marginTop: 20}}>
      {dates.map(d => <div style={{height: 100, boxSizing: 'border-box', width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #222'}} key={d.getTime()} onClick={() => setSelectedDate(getDateRefreshed(d))}>
        <TPText>{days[d.getDay()]}</TPText>
        <TPText bold={getDateRefreshed(selectedDate).getTime() === getDateRefreshed(d).getTime()}>{d.getDate()}</TPText>
      </div>)}
    </div>
  </ScrollView>;
};

export default Schedule;
