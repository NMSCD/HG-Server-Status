import { Tooltip } from '@hope-ui/solid';
import classNames from 'classnames';
import { Component, For } from 'solid-js';
import { MonitorRecordPerHour } from '../contracts/data/MonitorRecordPerHour';
import { MonitorRecordViewModel } from '../contracts/MonitorRecordViewModel';
import { hoursToEpoch } from '../helper/dateHelper';

interface IMonitorStatusRow {
    record: MonitorRecordViewModel;
    setModalContent: (monitorRecordPerHour: MonitorRecordPerHour) => void;
}

export const MonitorStatusRow: Component<IMonitorStatusRow> = (props: IMonitorStatusRow) => {

    const numBars = 168;
    const arrItems: Array<MonitorRecordPerHour> = new Array(numBars);
    for (let arrIndex = 0; arrIndex < arrItems.length; arrIndex++) {
        const maxHour = Math.round(props.record.maxMinutesSinceEpochInterval / 60) - arrIndex;
        const minMinutes = maxHour * 60;
        const maxMinutes = (maxHour + 1) * 60;
        const records = props.record.ticks.filter(t => (
            t.minutesSinceEpochInterval > minMinutes &&
            t.minutesSinceEpochInterval < maxMinutes
        ));

        if (records.length > 0) {
            const perHour: MonitorRecordPerHour = {
                hoursSinceEpochInterval: maxHour,
                maxStatus: Math.max(...props.record.ticks.map(t => t.maxStatus)),
                records,
            }
            arrItems[arrIndex] = perHour;
        }
        else {
            arrItems[arrIndex] = {
                maxStatus: 0,
                hoursSinceEpochInterval: maxHour,
                records: [],
            };
        }
    }
    const reversed = arrItems.reverse();

    return (
        <div class="status-row">
            <For each={reversed}>
                {tick => (
                    <Tooltip label={hoursToEpoch(tick.hoursSinceEpochInterval).toISOString()}>
                        <div
                            class={classNames('bar', 'bar-' + tick.maxStatus)}
                            onClick={() => props.setModalContent(tick)}>
                        </div>
                    </Tooltip>
                )}
            </For>
        </div>
    );
};
