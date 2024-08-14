import { ModalBody, ModalHeader, Text } from "@hope-ui/solid";
import {
  Component,
  createEffect,
  createSignal,
  For,
  Match,
  Show,
  Switch,
} from "solid-js";
import { NetworkState } from "../constants/enum/NetworkState";
import { MonitorStatusTickViewModel } from "../contracts/MonitorStatusViewModel";
import {
  hoursToEpoch,
  minutesToEpoch,
  monitorHourFormat,
  monitorTickFormat,
} from "../helper/dateHelper";
import { ApiService } from "../services/api/ApiService";
import { MonitorStatusIcon } from "./monitorStatusRow";

export interface ISelectedMonitorTickProps {
  percentage: number;
  monitorId: number;
  hour: number;
}

export const MonitorDetailModal: Component<ISelectedMonitorTickProps> = (
  props: ISelectedMonitorTickProps
) => {
  const [networkState, setNetworkState] = createSignal<NetworkState>(
    NetworkState.Loading
  );
  const [monitorTickRecords, setMonitorTickRecords] =
    createSignal<Array<MonitorStatusTickViewModel>>();

  createEffect(() => {
    fetchData(props.monitorId, props.hour);
  }, [props.monitorId, props.hour]);

  const fetchData = async (monitorId: number, hour: number) => {
    setNetworkState(NetworkState.Loading);
    const apiService = new ApiService();
    const apiResult = await apiService.getMonitorRecordTicks(monitorId, hour);
    if (apiResult.isSuccess == false) {
      setNetworkState(NetworkState.Error);
      return;
    }

    setMonitorTickRecords(apiResult.value);
    setNetworkState(NetworkState.Success);
  };

  const getPercentage = (record: MonitorStatusTickViewModel) => {
    const successPerc = record.numSuccessStatuses / record.numStatuses;
    return successPerc * 100;
  };

  return (
    <>
      <ModalHeader>
        <MonitorStatusIcon percentage={props.percentage} />
        {monitorHourFormat(hoursToEpoch(props.hour))}
      </ModalHeader>
      <ModalBody>
        <Switch>
          <Match when={networkState() === NetworkState.Error}>
            <div class="col-12" style={{ "text-align": "center" }}>
              <img
                src="/assets/img/error.png"
                alt="loading"
                style={{ margin: "0 auto", "max-height": "200px" }}
              />
              <h2>Oops! Something went wrong</h2>
            </div>
          </Match>
          <Match when={networkState() === NetworkState.Loading}>
            <div class="col-12" style={{ "text-align": "center" }}>
              <img
                src="/assets/img/loader.svg"
                alt="loading"
                style={{ margin: "0 auto" }}
              />
            </div>
          </Match>
          <Match when={networkState() === NetworkState.Success}>
            <Show when={(monitorTickRecords() ?? []).length < 1}>
              <Text textAlign="center" mt="1em">
                <br />
                Nothing recorded for this hour
                <br />
                <br />
              </Text>
            </Show>
            <Show when={(monitorTickRecords() ?? []).length > 0}>
              <Text>Records for this hour:</Text>
            </Show>
            <For each={monitorTickRecords()}>
              {(record) => (
                <p>
                  <MonitorStatusIcon percentage={getPercentage(record)} />
                  {monitorTickFormat(
                    minutesToEpoch(record.minutesSinceEpochInterval)
                  )}
                </p>
              )}
            </For>
          </Match>
        </Switch>
      </ModalBody>
    </>
  );
};
