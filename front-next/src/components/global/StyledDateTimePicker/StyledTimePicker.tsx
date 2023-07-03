/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { v4 } from "uuid";
import useClickOutside from "../../../hooks/useClickOutside";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 16px;

  background: white;

  border: 1px solid var(--gray-200);
  border-radius: 8px 8px 0 0;
`;

const DateCalendarButton = styled.div`
  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #2f2f2f;
  font-size: 14px;
  font-weight: 600;

  margin: 0 auto 8px;
  padding: 6px 12px;

  border-radius: 24px;

  cursor: pointer;

  :hover {
    color: white;
    background-color: #18a1a5;
  }
`;

const Row = styled.div<{ interval: number }>`
  display: flex;
  align-items: center;
  justify-content: ${({ interval }) =>
    interval === 5 ? "space-between" : "center"};
  gap: ${({ interval }) => (interval === 5 ? "unset" : "16px")};
  width: 100%;
`;

const Column = styled.div`
  width: 100%;
  height: 100%;

  > div + div {
    margin-top: 8px;
  }
`;

interface TimeItemProps {
  disabled?: boolean;
  isNow: boolean;
  selected: boolean;
}

const TimeItem = styled.div<TimeItemProps>`
  width: 64px;

  background-color: #fff;

  color: #2f2f2f;
  font-size: 12px;
  font-weight: 400;
  padding: 4px;

  border-radius: 16px;
  border: 1px solid transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: default;

  ${(props) => {
    if (props.isNow) {
      return `
        background-color: #18a1a5;
        color: white;`;
    }
  }};

  ${(props) => {
    if (props.selected) {
      return `
        border: 1px solid #18a1a5;
        color: #18a1a5;
        `;
    }
  }};

  ${(props) => {
    if (props.selected && props.isNow) {
      return `
        color: white;
        `;
    }
  }};

  ${(props) => {
    if (props.disabled) {
      return `opacity: 0.2`;
    }
  }};

  &:hover {
    color: ${(props) => !props.disabled && "white"};
    cursor: ${(props) => !props.disabled && "pointer"};
    background-color: ${(props) => !props.disabled && "#18a1a5"};
  }

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

interface ITime {
  hour?: number;
  minute?: number;
  period?: "am" | "pm";
}

interface IHourItem {
  hour: {
    label: string;
    value: number;
  };
  selected: boolean;
  isNow: boolean;
}

interface IMinuteItem {
  minute: {
    label: string;
    value: number;
  };
  isNow: boolean;
  selected: boolean;
}

interface Props {
  minuteInterval: number;
  date: Date | undefined;
  noLabel?: boolean;
  onSelect: (date: ITime) => void;
  goBack: () => void;
  step: "hour" | "minute";
  setStep: (props: "hour" | "minute") => void;
}

export default function StyledTimePìcker(props: Props): JSX.Element {
  const { onSelect, date, goBack, noLabel, minuteInterval, step, setStep } =
    props;
  const [hourMatrix, setHourMatrix] = useState<IHourItem[][]>([[]]);
  const [minutesMatrix, setMinutesMatrix] = useState<IMinuteItem[][]>([[]]);
  const [time, setTime] = useState<ITime | undefined>();
  const now = dayjs(noLabel ? new Date().setHours(0) : undefined);

  const buildHourMatrix = useCallback(() => {
    const rowArray = [];
    const rowsArray = [];

    for (let i = 0; i < 24; i += 1) {
      const hour = i % 12 === 0 ? 12 : i;
      if (i % 4 === 0 && i !== 0) {
        rowsArray.push([...rowArray]);
        // This empties the array
        rowArray.length = 0;
      }

      rowArray.push({
        isNow: i === now.hour(),
        selected: false,
        hour: {
          label: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${
            i < 12 ? "am" : "pm"
          }`.padStart(2, "0"),
          value: i,
        },
      });
    }
    rowsArray.push([...rowArray]);

    setHourMatrix([...rowsArray]);
  }, []);

  const buildMinutesMatrix = useCallback(
    ({ hour, period }: ITime) => {
      const minutesArray = [];
      const minutesRowArray: IMinuteItem[] = [];

      for (let i = 0; minuteInterval === 5 ? i < 12 : i < 4; i += 1) {
        const isNow =
          (i + 1) * minuteInterval >= now.minute() &&
          i * minuteInterval < now.minute();
        if (i % (minuteInterval === 5 ? 4 : 2) === 0 && i !== 0) {
          minutesArray.push([...minutesRowArray]);
          minutesRowArray.length = 0;
        }
        const labeledHour =
          (((hour as number) % 12 === 0 ? 12 : hour) as number) % 12;

        minutesRowArray.push({
          selected: false,
          minute: {
            label: `${labeledHour === 0 ? 12 : labeledHour}:${`${
              i * minuteInterval
            }`.padStart(2, "0")} ${period}`,
            value: i * minuteInterval,
          },
          isNow,
        });
      }
      minutesArray.push([...minutesRowArray]);

      setMinutesMatrix(minutesArray);
    },
    [minuteInterval]
  );

  useEffect(() => {
    if (time) buildMinutesMatrix(time);
  }, [minuteInterval]);

  function onHourPick(chosenHour: number) {
    const hourTime = {
      ...time,
      hour: chosenHour,
      period: (chosenHour >= 12 ? "pm" : "am") as "am" | "pm",
    };

    setTime(hourTime);
    setStep("minute");
    buildMinutesMatrix(hourTime);
  }

  function onMinutePick(chosenTime: number) {
    const newTime = {
      ...time,
      minute: chosenTime,
    };
    setTime(newTime as ITime);
    onSelect(newTime as ITime);
  }

  useEffect(() => {
    buildHourMatrix();
  }, [buildHourMatrix]);

  function formatLabel() {
    const formated = date ? dayjs(date).format("MMM DD, YYYY") : "--- --, ----";
    let label = `${formated}`;

    if (time) {
      label += ` - ${time.hour === 0 ? 12 : (time.hour || 13) % 12}:${
        time.minute || "00"
      } ${time.period === "am" ? "am" : "pm"}`;
    }

    return label;
  }

  const ref = useClickOutside(() => {
    if (noLabel) goBack();
  });

  return (
    <Wrapper ref={ref}>
      {!noLabel && (
        <DateCalendarButton
          onClick={() => {
            goBack();
          }}
        >
          {formatLabel()}
        </DateCalendarButton>
      )}

      {step === "hour" ? (
        <Column>
          {hourMatrix.map((hourColumn) => {
            return (
              <Row key={v4()} interval={5}>
                {hourColumn.map((hour) => {
                  const disabled =
                    dayjs(date).isSame(now, "day") &&
                    now.hour() > hour.hour.value;

                  return (
                    <TimeItem
                      selected={
                        dayjs(date).hour() === hour.hour.value &&
                        dayjs(date).minute() !== 21
                      }
                      disabled={disabled}
                      key={v4()}
                      isNow={hour.isNow}
                      onClick={() => {
                        if (!disabled) onHourPick(hour.hour.value);
                      }}
                    >
                      {hour.hour.label}
                    </TimeItem>
                  );
                })}
              </Row>
            );
          })}
        </Column>
      ) : (
        <Column>
          {minutesMatrix.map((minutesRow) => {
            return (
              <Row key={v4()} interval={minuteInterval}>
                {minutesRow.map((minute) => {
                  const disabled =
                    dayjs(date).isSame(now, "day") &&
                    time?.hour === now.hour() &&
                    now.minute() >= minute.minute.value;

                  return (
                    <TimeItem
                      selected={
                        time?.hour === dayjs(date).hour() &&
                        dayjs(date).minute() === minute.minute.value
                      }
                      disabled={disabled}
                      key={v4()}
                      isNow={time?.hour === now.hour() && minute.isNow}
                      onClick={() => {
                        if (!disabled) onMinutePick(minute.minute.value);
                      }}
                    >
                      {minute.minute.label}
                    </TimeItem>
                  );
                })}
              </Row>
            );
          })}
        </Column>
      )}
    </Wrapper>
  );
}
