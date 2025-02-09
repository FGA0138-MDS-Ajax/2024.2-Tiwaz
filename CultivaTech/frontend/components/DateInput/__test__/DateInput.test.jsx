import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";
import DateInput from '../index';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: ({ value, onChange }) => {
    const React = require("react");
    const { View, Button } = require("react-native");

    return (
      <View>
        <Button
          testID="mock-date-picker"
          title="Mock Date Picker"
          onPress={() => onChange({ type: 'set' }, new Date('2025-02-08'))}
        />
      </View>
    );
  }
}));

describe('DateInput Component', () => {
  it('renders the date input correctly', () => {
    const { getByTestId } = render(
      <DateInput placeholder="Select date" setValue={jest.fn()} />
    );
    
    const input = getByTestId('date-input-pressable');
    expect(input).toBeTruthy();
  });

  it('opens the DateTimePicker when clicked', () => {
    const { getByTestId } = render(
      <DateInput placeholder="Select date" setValue={jest.fn()} />
    );

    const input = getByTestId('date-input-pressable');
    fireEvent.press(input);

    const datePicker = getByTestId('mock-date-picker');
    expect(datePicker).toBeTruthy();
  });

  it('updates the value correctly when a date is selected', () => {
    const setValue = jest.fn();
    const { getByTestId } = render(
      <DateInput placeholder="Select date" setValue={setValue} />
    );

    const input = getByTestId('date-input-pressable');
    fireEvent.press(input);

    const datePicker = getByTestId('mock-date-picker');
    fireEvent.press(datePicker);

    expect(setValue).toHaveBeenCalledWith(new Date('2025-02-08'));
  });
});