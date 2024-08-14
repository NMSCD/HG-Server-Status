import { Tooltip } from "@hope-ui/solid";
import classNames from "classnames";
import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import { statusColours } from "../constants/colour";
import {
  MonitorStatusHourViewModel,
  MonitorStatusViewModel,
} from "../contracts/MonitorStatusViewModel";
import { approximateColor1ToColor2ByPercent } from "../helper/colourHelper";
import { hoursToEpoch, monitorHourFormat } from "../helper/dateHelper";
import { CheckMarkIcon } from "./icon/checkmark";
import { ErrorCrossIcon } from "./icon/errorCross";
import { QuestionMarkIcon } from "./icon/questionMark";

interface IMonitorStatusRow {
  record: MonitorStatusViewModel;
  setModalContent: (monitorRecordPerHour: MonitorStatusHourViewModel) => void;
}

export const MonitorStatusRow: Component<IMonitorStatusRow> = (
  props: IMonitorStatusRow
) => {
  const [numBars, setNumBars] = createSignal<number>(168);

  createEffect(() => {
    const handleResize = () => {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);

      const screenWidth = screen.width;
      let screenPerc = screenWidth / 1920;
      if (screenPerc > 1) screenPerc = 1;
      setNumBars(Math.round(168 * screenPerc));
    };

    window.addEventListener("resize", handleResize);
  });

  const getHourArr = (
    numBarsInt: number
  ): Array<MonitorStatusHourViewModel> => {
    const utcHoursSinceEpoch = Math.floor(new Date().getTime() / 3600000);
    const arrItems: Array<MonitorStatusHourViewModel> = new Array(numBarsInt);
    for (let arrIndex = 0; arrIndex < arrItems.length; arrIndex++) {
      const hourSinceEpochInterval = utcHoursSinceEpoch - arrIndex;
      const hourRow = props.record.hours.find(
        (h) => h.hourSinceEpochInterval === hourSinceEpochInterval
      );

      if (hourRow != null) {
        const perHour: MonitorStatusHourViewModel = { ...hourRow };
        arrItems[arrIndex] = perHour;
      } else {
        arrItems[arrIndex] = {
          numStatuses: 0,
          numSuccessStatuses: 0,
          hourSinceEpochInterval: hourSinceEpochInterval,
        };
      }
    }
    const reversed = arrItems.reverse();
    return reversed;
  };

  const getOverrideStyleBasedOnMinuteStatuses = (
    hour: MonitorStatusHourViewModel
  ): JSX.CSSProperties => {
    const numFailed = hour.numStatuses - hour.numSuccessStatuses;
    const failedPerc = numFailed / hour.numStatuses;

    return {
      "background-color": approximateColor1ToColor2ByPercent(
        statusColours.success,
        statusColours.error,
        failedPerc
      ),
    };
  };

  const getPercentage = (hour: MonitorStatusHourViewModel) => {
    const successPerc = hour.numSuccessStatuses / hour.numStatuses;
    return successPerc * 100;
  };

  return (
    <div class="status-row" data-num-bars={numBars()}>
      <For each={getHourArr(numBars())}>
        {(hour) => (
          <Tooltip
            withArrow
            arrowSize={12}
            mt="0.5em"
            label={
              <>
                <MonitorStatusIcon percentage={getPercentage(hour)} />
                {monitorHourFormat(hoursToEpoch(hour.hourSinceEpochInterval))}
              </>
            }
          >
            <div
              class={classNames("bar", "bar-" + 0)}
              style={getOverrideStyleBasedOnMinuteStatuses(hour)}
              onClick={() => props.setModalContent(hour)}
            ></div>
          </Tooltip>
        )}
      </For>
    </div>
  );
};

interface IMonitorStatusIcon {
  percentage: number;
}
export const MonitorStatusIcon: Component<IMonitorStatusIcon> = (
  props: IMonitorStatusIcon
) => {
  if (props.percentage === 100) return <CheckMarkIcon />;
  if (props.percentage < 100 && props.percentage > 33)
    return <QuestionMarkIcon />;
  return <ErrorCrossIcon />;
};
