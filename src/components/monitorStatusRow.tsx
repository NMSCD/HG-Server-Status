import { Tooltip } from '@hope-ui/solid';
import classNames from 'classnames';
import { Component, For } from 'solid-js';
import { MonitorStatusHourViewModel, MonitorStatusViewModel } from '../contracts/MonitorStatusViewModel';
import { formatDate, hoursToEpoch, monitorHourFormat } from '../helper/dateHelper';
import { CheckMarkIcon } from './icon/checkmark';
import { ErrorCrossIcon } from './icon/errorCross';

interface IMonitorStatusRow {
    record: MonitorStatusViewModel;
    setModalContent: (monitorRecordPerHour: MonitorStatusHourViewModel) => void;
}

export const MonitorStatusRow: Component<IMonitorStatusRow> = (props: IMonitorStatusRow) => {

    const numBars = 168;
    const utcHoursSinceEpoch = Math.round((new Date()).getTime() / 3600000);
    const arrItems: Array<MonitorStatusHourViewModel> = new Array(numBars);
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

    return (
        <div class="status-row">
            <For each={reversed}>
                {hour => (
                    <Tooltip label={
                        <>
                            <MonitorStatusIcon maxStatus={hour.maxStatus} />
                            {monitorHourFormat(hoursToEpoch(hour.hourSinceEpochInterval))}
                        </>
                    }>
                        <div
                            class={classNames('bar', 'bar-' + hour.maxStatus)}
                            onClick={() => props.setModalContent(hour)}>
                        </div>
                    </Tooltip>
                )}
            </For>
        </div>
    );
};

interface IMonitorStatusIcon {
    maxStatus: number;
}
export const MonitorStatusIcon: Component<IMonitorStatusIcon> = (props: IMonitorStatusIcon) => {
    if (props.maxStatus == 2) return (<CheckMarkIcon />);
    return (<ErrorCrossIcon />);
}