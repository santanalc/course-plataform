/** @jsxImportSource @emotion/react */
import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FaCalendarAlt } from "react-icons/fa";
import useClickOutside from "../../../hooks/useClickOutside";
import StyledTimePicker from "./StyledTimePicker";
dayjs.extend(localizedFormat);

const ContainerRef = styled.div`
  width: 100%;
  height: 40px;
`;

const InputContainer = styled.div<{ isError?: boolean }>`
  width: 100%;
  height: 40px;

  padding: 16px;
  background: white;

  border: 1px solid;
  border-color: ${(props) => (props.isError ? "red" : "var(--gray-200)")};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShowDateTimeValue = styled.div<{ dateLabel: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${(props) => (props.dateLabel === "MM/DD/YYYY" ? "14px" : "16px")};
  font-weight: 400;
  color: ${(props) =>
    props.dateLabel === "MM/DD/YYYY"
      ? "var(--chakra-colors-gray-400)"
      : "var(--gray-700)"};

  cursor: pointer;

  > p + p {
    margin-left: 8px;
  }
`;

const DateLabel = styled.p``;

const TimeLabel = styled.p``;

const PickersContainer = styled.div`
  position: relative;

  z-index: 5;
`;

const CalendarContainer = styled.div<{ hideCalendar: boolean }>`
  display: ${(props) => (props.hideCalendar ? "none" : "block")};
`;

interface IntervalsContainerPopoverProps {
  intervals: number;
  setIntervals: (value: number) => void;
}

const IntervalsContainerPopover = ({
  intervals,
  setIntervals,
}: IntervalsContainerPopoverProps) => {
  return (
    <PopoverContent _focus={{ outline: "none" }}>
      <PopoverArrow />
      <PopoverHeader>Intervals</PopoverHeader>
      <PopoverBody>
        <RadioGroup
          onChange={(value) => setIntervals(parseInt(value))}
          value={intervals}
        >
          <Stack spacing="16px">
            <Radio
              _focus={{ outline: "none" }}
              cursor="pointer"
              colorScheme="teal"
              value={5}
            >
              <Text
                fontSize={["14px", "15px", "16px"]}
                fontWeight="500"
                color="cyan.800"
              >
                5 minutes intervals
              </Text>
            </Radio>

            <Radio
              _focus={{ outline: "none" }}
              cursor="pointer"
              colorScheme="teal"
              value={15}
            >
              <Text
                fontSize={["14px", "15px", "16px"]}
                fontWeight="500"
                color="cyan.800"
              >
                15 minutes intervals
              </Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </PopoverBody>
    </PopoverContent>
  );
};

interface Props {
  showTimePicker?: boolean;
  showDatePicker?: boolean;
  date: Date | undefined;
  input?: boolean;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (date: Date) => void;
  disabled?: boolean;
  isError?: boolean;
}

export default function StyledDateTimePickerComponent(
  props: Props
): JSX.Element {
  const {
    showTimePicker,
    showDatePicker,
    onDateSelect,
    onTimeSelect,
    date,
    input,
    disabled,
    isError,
  } = props;

  const [isTimePickerActive, setTimePickerActivity] = useState(false);
  const [dateLabel, setDateLabel] = useState<string>("MM/DD/YY");
  const [timeLabel, setTimeLabel] = useState("HH:MM");
  const [hideCalendar, setHideCalendar] = useState<boolean>(true);
  const [intervals, setIntervals] = useState<number>(5);
  const [step, setStep] = useState<"hour" | "minute">("hour");

  const wrapperRef = useClickOutside(() => {
    if (date) {
      setHideCalendar(true);
      setTimePickerActivity(false);
    }
  });

  useEffect(() => {
    if (date) {
      setDateLabel(dayjs(date).format("L"));
      if (date.getMinutes() !== 21)
        setTimeLabel(`${dayjs(date).format("LT").toLowerCase()}`);
      else setTimeLabel("--:--");
    } else {
      setDateLabel("MM/DD/YYYY");
      setTimeLabel("HH:MM");
      setHideCalendar(true);
    }
  }, [date]);

  function handleShowCalendar() {
    if (disabled) return;
    setHideCalendar(!hideCalendar);
    if (isTimePickerActive) {
      setTimePickerActivity(!isTimePickerActive);
    }
  }

  function handleShowTimePicker() {
    setTimePickerActivity(!isTimePickerActive);
    if (!hideCalendar) {
      setHideCalendar(true);
    }
  }

  function goToToday() {
    const currentDate = new Date();

    onDateSelect(currentDate);
  }

  useEffect(() => {
    if (!isTimePickerActive || !showTimePicker) setStep("hour");
  }, [isTimePickerActive, showTimePicker]);

  return (
    <ContainerRef ref={wrapperRef}>
      {input && (
        <InputContainer onClick={handleShowCalendar} isError={isError}>
          <ShowDateTimeValue dateLabel={dateLabel}>
            <DateLabel>{dateLabel}</DateLabel>
            <TimeLabel
              onClick={(e) => {
                e.stopPropagation();
                handleShowTimePicker();
              }}
            >
              {timeLabel}
            </TimeLabel>
          </ShowDateTimeValue>
          <Icon color="orange.300" as={FaCalendarAlt} />
        </InputContainer>
      )}

      <PickersContainer>
        {showDatePicker && (
          <CalendarContainer hideCalendar={hideCalendar}>
            <Calendar
              minDate={new Date()}
              onChange={(vle: Date) => {
                if (timeLabel === "HH:MM") {
                  vle.setMinutes(21);
                }
                onDateSelect(vle as Date);
                setTimeout(() => {
                  handleShowCalendar();
                  handleShowTimePicker();
                }, 60);
              }}
              formatMonth={(date) => dayjs(date).format("MMM")}
              value={date}
              locale="en-US"
              allowPartialRange={false}
            />

            <Button
              width="100%"
              color="white"
              fontWeight="500"
              bgColor="orange.300"
              borderTopRadius="0"
              _hover={{
                bgColor: "orange.400",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={() => {
                goToToday();
                setHideCalendar(!hideCalendar);
              }}
            >
              Today
            </Button>
          </CalendarContainer>
        )}

        {isTimePickerActive && showTimePicker && (
          <>
            <StyledTimePicker
              step={step}
              setStep={setStep}
              goBack={() => {
                handleShowCalendar();
              }}
              date={date}
              minuteInterval={intervals}
              onSelect={({ hour, minute }) => {
                handleShowTimePicker();
                const selectedDateTime = new Date();

                if (date) {
                  const year = dayjs(date).get("year");
                  const month = dayjs(date).get("month");
                  const day = dayjs(date).get("date");

                  selectedDateTime.setFullYear(+year);
                  selectedDateTime.setMonth(+month);
                  selectedDateTime.setDate(+day);
                }

                selectedDateTime.setHours(hour as number);
                selectedDateTime.setMinutes(minute as number);
                selectedDateTime.setSeconds(0);

                onTimeSelect(selectedDateTime);
              }}
            />

            {step === "minute" && (
              <Popover autoFocus={false}>
                <PopoverTrigger>
                  <Button
                    width="100%"
                    color="white"
                    fontWeight="500"
                    bgColor="orange.300"
                    borderTopRadius="0"
                    _hover={{
                      bgColor: "orange.400",
                    }}
                    _focus={{ boxShadow: "none" }}
                  >
                    Intervals
                  </Button>
                </PopoverTrigger>

                <IntervalsContainerPopover
                  intervals={intervals}
                  setIntervals={setIntervals}
                />
              </Popover>
            )}
          </>
        )}
      </PickersContainer>
    </ContainerRef>
  );
}
