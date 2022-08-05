import { Tooltip } from '@hope-ui/solid';
import classNames from 'classnames';
import { Component, createEffect, createSignal, For, JSX } from 'solid-js';
import { statusColours } from '../constants/colour';
import { MonitorStatusHourViewModel, MonitorStatusTickViewModel, MonitorStatusViewModel } from '../contracts/MonitorStatusViewModel';
import { approximateColor1ToColor2ByPercent } from '../helper/colourHelper';
import { formatDate, hoursToEpoch, monitorHourFormat } from '../helper/dateHelper';
import { CheckMarkIcon } from './icon/checkmark';
import { ErrorCrossIcon } from './icon/errorCross';
import { QuestionMarkIcon } from './icon/questionMark';

interface IMonitorStatusRow {
    record: MonitorStatusViewModel;
    setModalContent: (monitorRecordPerHour: MonitorStatusHourViewModel) => void;
}

export const MonitorStatusRow: Component<IMonitorStatusRow> = (props: IMonitorStatusRow) => {

    const [numBars, setNumBars] = createSignal<number>(168);

    createEffect(() => {
        const handleResize = () => {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);

            const screenWidth = screen.width;
            let screenPerc = (screenWidth / 1920);
            if (screenPerc > 1) screenPerc = 1;
            setNumBars(Math.round(168 * screenPerc));
        }

        window.addEventListener('resize', handleResize);
    });

    const getHourArr = (numBarsInt: number): Array<MonitorStatusHourViewModel> => {
        const utcHoursSinceEpoch = Math.round((new Date()).getTime() / 3600000);
        const arrItems: Array<MonitorStatusHourViewModel> = new Array(numBarsInt);
        for (let arrIndex = 0; arrIndex < arrItems.length; arrIndex++) {
            const hourSinceEpochInterval = utcHoursSinceEpoch - arrIndex;
            const hourRow = props.record.hours.find(h => h.hourSinceEpochInterval === hourSinceEpochInterval);

            if (hourRow != null) {
                const perHour: MonitorStatusHourViewModel = { ...hourRow };
                arrItems[arrIndex] = perHour;
            }
            else {
                arrItems[arrIndex] = {
                    maxStatus: 0,
                    hourSinceEpochInterval: hourSinceEpochInterval,
                    dateRecorded: hoursToEpoch(hourSinceEpochInterval),
                    ticks: [],
                };
            }
        }
        const reversed = arrItems.reverse();

        // If latest value is unknown, use the previous hour's value
        if (reversed[reversed.length - 1].maxStatus === 0) {
            reversed[reversed.length - 1].maxStatus = reversed[reversed.length - 2].maxStatus;
        }

        return reversed;
    }

    const getOverrideStyleBasedOnMinuteStatuses = (hour: MonitorStatusHourViewModel): JSX.CSSProperties => {
        const numTicks = hour.ticks?.length ?? 0;
        if (numTicks < 1) return {};

        const tickAvgStatus = hour.ticks.reduce((total: number, next: MonitorStatusTickViewModel) =>
            total + next.status, 0) / numTicks;
        if (hour.maxStatus == tickAvgStatus) return {};

        const numFailed = hour.ticks.map(t => t.status).filter(t => t != 2).length;
        const failedPerc = numFailed / numTicks;

        return {
            'background-color': approximateColor1ToColor2ByPercent(statusColours.success, statusColours.error, failedPerc),
        }
    }

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
                                <MonitorStatusIcon maxStatus={hour.maxStatus} />
                                {monitorHourFormat(hoursToEpoch(hour.hourSinceEpochInterval))}
                            </>
                        }>
                        <div
                            class={classNames('bar', 'bar-' + hour.maxStatus)}
                            style={getOverrideStyleBasedOnMinuteStatuses(hour)}
                            onClick={() => props.setModalContent(hour)}>
                        </div>
                    </Tooltip>
                )
                }
            </For >
        </div >
    );
};

interface IMonitorStatusIcon {
    maxStatus: number;
}
export const MonitorStatusIcon: Component<IMonitorStatusIcon> = (props: IMonitorStatusIcon) => {
    if (props.maxStatus === 0) return (<QuestionMarkIcon />);
    if (props.maxStatus === 2) return (<CheckMarkIcon />);
    return (<ErrorCrossIcon />);
}