import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const defaultDaysToShow = 7;

interface DateSelectorProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  daysToShow?: number;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
  daysToShow = defaultDaysToShow,
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState(new Date());
  const currentSelectedDate = selectedDate ?? internalSelectedDate;

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }); 
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate(); 
  };

  const formatMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short' }); 
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <FlatList
      horizontal
      data={getDates()}
      keyExtractor={(item) => item.toDateString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isSelected =
          item.toDateString() === currentSelectedDate.toDateString();
        return (
          <TouchableOpacity
            style={[styles.dateBox, isSelected && styles.activeBox]}
            onPress={() => {
              setInternalSelectedDate(item);
              onSelectDate?.(item);
            }}
          >
            <Text style={[styles.dayText, isSelected && styles.activeText]}>
              {isToday(item) ? 'Today' : formatDay(item)}
            </Text>
            <Text style={[styles.dateText, isSelected && styles.activeText]}>
              {formatDayNumber(item)} {formatMonthName(item)}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dateBox: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:85,
  },
  activeBox: {
    backgroundColor: '#2176FF',
  },
  dayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#555',
    fontSize: 12,
  },
  activeText: {
    color: '#fff',
  },
});

export default DateSelector;
