import React, { useEffect, useState } from 'react';

import parseISO from 'date-fns/parseISO';
import dayjs from 'dayjs';

import Input, { InputProps } from 'src/components/Input';

type DateInputProps = InputProps & {
  // use a string to avoid timezone issues
  onDateChange?: (value: string) => void;
};

const DateInput: React.FC<DateInputProps> = ({ placeholder, value, onDateChange, ...props }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [current, setCurrent] = useState<'day' | 'month' | 'year'>('day');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value) {
      const date = parseISO(value as string);

      if (date) {
        setDay(date.getDate().toString().padStart(2, '0'));
        setMonth((date.getMonth() + 1).toString().padStart(2, '0'));
        setYear(date.getFullYear().toString().padStart(4, '0'));
      }
    }
  }, [value]);

  const handleKeyDown = ({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
    const { selectionStart, selectionEnd } = currentTarget;
    const hasSelection = selectionStart !== selectionEnd;

    if (key === 'Backspace') {
      if (hasSelection && selectionStart === 0) {
        setDay('');
        setMonth('');
        setYear('');

        setCurrent('day');

        return;
      }

      if (current === 'day' && day !== '') {
        setDay(day.slice(0, -1));
      }

      if (current === 'month') {
        if (month === '') {
          setCurrent('day');
          // setDay(day.slice(0, -1));
        } else {
          setMonth(month.slice(0, -1));
        }
      }

      if (current === 'year') {
        if (year === '') {
          setCurrent('month');
          // setMonth(month.slice(0, -1));
        } else {
          setYear(year.slice(0, -1));
        }
      }
    }

    if (/[0-9]/.exec(key)) {
      if (hasSelection && selectionStart === 0) {
        setDay(key);
        setMonth('');
        setYear('');

        setCurrent('day');

        return;
      }

      if (current === 'day' && ~~(day + key) <= 31) {
        setDay(day + key);
      }

      if (current === 'month' && ~~(month + key) <= 12) {
        setMonth(month + key);
      }

      if (current === 'year' && year.length < 4) {
        setYear(year + key);
      }
    }

    if (key === '/') {
      if (current === 'day') {
        setDay(day.padStart(2, '0'));
        setCurrent('month');
      }

      if (current === 'month') {
        setMonth(month.padStart(2, '0'));
        setCurrent('year');
      }
    }
  };

  useEffect(() => {
    if (day.length === 2) {
      setCurrent('month');
    }

    if (day === '00') {
      setDay('01');
    }
  }, [day]);

  useEffect(() => {
    if (month.length === 2) {
      setCurrent('year');
    }

    if (month === '00') {
      setMonth('01');
    }
  }, [month]);

  const getValue = () => {
    const value = [];

    if (day) {
      value.push(day);
    }

    if (month || current === 'month') {
      value.push(month);
    }

    if (year || current === 'year') {
      value.push(year);
    }

    return value.join(' / ');
  };

  useEffect(() => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      onDateChange?.(dayjs.utc([Number(year), Number(month), Number(day)].join('-')).toISOString());
    }
  }, [day, month, year, onDateChange]);

  return (
    <Input
      {...props}
      onChange={() => {}}
      value={getValue()}
      placeholder={focused ? 'jj / mm / aaaa' : placeholder}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default DateInput;
