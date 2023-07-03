import { css } from "@emotion/react";

export const GlobalStyle = css`
  :root {
    --blue-300: #009bd5;
    --blue-400: #0075bb;
    --orange-100: #fdedd4;
    --orange-150: #f0ad4e;
    --orange-300: #fb972e;
    --orange-400: #f8a930;
    --orange-600: #df982b;
    --gray-100: #f5f6f7;
    --gray-200: #e2e8f0;
    --gray-300: #cccccc;
    --gray-400: #6b6b6b;
    --gray-600: #707070;
    --gray-700: #2f2f2f;
    --green-300: #75b85c;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: "Source Sans Pro", sans-serif;
  }

  html {
    max-width: 100vw;
    width: 100%;
    max-height: 100vh;
    min-height: 100%;

    overflow: hidden;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    outline: none;

    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
  }

  body {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  svg {
    flex-shrink: 0;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }

  *::-webkit-scrollbar {
    width: 4px;
  }

  *::-webkit-scrollbar-thumb {
    width: 4px;
    background: var(--gray-300);
    border: 0.5rem;
    border-radius: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    width: 4px;
    background: #f5f5f5;
    border-radius: 0.5rem;
  }

  /*! react-select styles */
  .select__control,
  .react-select-container {
    width: 100% !important;
    height: 36px !important;
  }

  .react-select__value-container,
  .react-select__control {
    height: 36px !important;

    overflow: hidden !important;
  }

  .select__control {
    border-radius: 8px !important;
  }

  /* .react-select__option--is-selected {
    background: #fb972e !important;
  } */

  .react-select__control--is-focused {
    box-shadow: 0px 0px 6px #f8a930 !important;
    border: 1px solid #fb972e !important;
  }

  /*! react-calendar styles */
  .react-calendar {
    width: 100%;
    height: 100%;

    padding: 16px;

    background: white;

    border: 1px solid var(--gray-200);
    border-radius: 8px 8px 0 0;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar__navigation button[disabled],
  .react-calendar__navigation button[disabled]:hover,
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__year-view__months__month:disabled,
  .react-calendar__century-view__decades__decade:disabled,
  .react-calendar__decade-view__years__year:disabled,
  .react-calendar__tile.react-calendar__month-view__days__day:disabled {
    color: #919191;
    cursor: not-allowed;
  }

  .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend.react-calendar__month-view__days__day--neighboringMonth {
    cursor: pointer;
  }

  /*! navigation */
  .react-calendar__navigation__label {
    color: #2f2f2f;
    font-size: 14px;
    font-weight: 600;

    padding: 6px 12px;

    border-radius: 24px;
  }

  .react-calendar__navigation {
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  }

  /*! prev and next buttons on navigation from react-calendar */
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    color: #2f2f2f;

    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
  }

  .react-calendar__navigation__next-button:enabled:hover,
  .react-calendar__navigation__prev-button:enabled:hover {
    color: #18a1a5;
  }

  /*! weekdays */
  .react-calendar__month-view__weekdays {
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;

    margin: 8px 0 8px;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    color: #2f2f2f !important;
    text-decoration: none !important;
    font-weight: 300 !important;
  }

  /*! months, decade, century and years */
  .react-calendar__tile.react-calendar__decade-view__years__year,
  .react-calendar__tile.react-calendar__century-view__decades__decade,
  .react-calendar__tile.react-calendar__year-view__months__month {
    font-size: 14px;

    padding: 4px 8px;

    border-radius: 32px;
  }

  .react-calendar__tile.react-calendar__tile--now.react-calendar__century-view__decades__decade,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__decade-view__years__year,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__year-view__months__month,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend
    > abbr,
  .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day
    > abbr {
    background-color: #18a1a5;
    color: white;
  }

  /*! days */
  .react-calendar__tile.react-calendar__month-view__days__day {
    padding: 4px 0;

    border-radius: 8px;
  }

  .react-calendar__tile.react-calendar__month-view__days__day > abbr {
    min-height: 24px;
    max-height: 24px;
    min-width: 24px;
    max-width: 24px;

    border-radius: 50%;

    font-size: 14px;
    line-height: 24px;

    display: block;

    margin: 0 auto;
  }

  .react-calendar__tile.react-calendar__month-view__days__day:enabled
    > abbr:hover {
    background-color: #18a1a5;
    color: white;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    filter: brightness(0.9) !important;
  }

  .react-calendar__tile.react-calendar__century-view__decades__decade:enabled:hover,
  .react-calendar__tile.react-calendar__century-view__decades__decade:enabled:focus,
  .react-calendar__tile.react-calendar__decade-view__years__year:enabled:hover,
  .react-calendar__tile.react-calendar__decade-view__years__year:enabled:focus,
  .react-calendar__tile.react-calendar__year-view__months__month:enabled:hover,
  .react-calendar__tile.react-calendar__year-view__months__month:enabled:focus {
    background-color: #18a1a5;
    color: white;
  }

  .react-calendar__century-view__decades,
  .react-calendar__decade-view__years,
  .react-calendar__year-view__months {
    gap: 8px 0;
  }
`;
