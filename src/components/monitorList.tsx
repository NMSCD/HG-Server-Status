import {
  Button,
  createDisclosure,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@hope-ui/solid";
import { Component, createSignal, For, Match, onMount, Switch } from "solid-js";
import { NetworkState } from "../constants/enum/NetworkState";
import {
  MonitorStatusHourViewModel,
  MonitorStatusViewModel,
} from "../contracts/MonitorStatusViewModel";
import { anyObject } from "../helper/typescriptHacks";
import { ApiService } from "../services/api/ApiService";
import {
  ISelectedMonitorTickProps,
  MonitorDetailModal,
} from "./monitorDetailModal";
import { MonitorStatusIcon, MonitorStatusRow } from "./monitorStatusRow";

export const MonitorList: Component = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  const [networkState, setNetworkState] = createSignal<NetworkState>(
    NetworkState.Loading
  );
  const [monitorRecords, setMonitorRecords] =
    createSignal<Array<MonitorStatusViewModel>>();
  const [selectedMonitorTickRecord, setSelectedMonitorTickRecord] =
    createSignal<ISelectedMonitorTickProps>(anyObject);

  onMount(() => {
    fetchData();
  });

  const fetchData = async () => {
    const apiService = new ApiService();
    const today = new Date();
    const endDate = today.toISOString().substring(0, 10);

    today.setDate(today.getDate() - 7);
    const startDate = today.toISOString().substring(0, 10);
    const apiResult = await apiService.getMonitorRecord(startDate, endDate);
    if (apiResult.isSuccess == false) {
      setNetworkState(NetworkState.Error);
      return;
    }

    setMonitorRecords(apiResult.value);
    setNetworkState(NetworkState.Success);
  };

  const setModalContent =
    (monitorId: number) =>
    (monitorRecordPerHour: MonitorStatusHourViewModel) => {
      setSelectedMonitorTickRecord({
        monitorId,
        percentage:
          (monitorRecordPerHour.numSuccessStatuses /
            monitorRecordPerHour.numStatuses) *
          100,
        hour: monitorRecordPerHour.hourSinceEpochInterval,
      });
      onOpen();
    };

  const getPercentage = (monitor: MonitorStatusViewModel) => {
    const totalStatuses = monitor.hours.reduce(
      (partial, cur) => partial + cur.numStatuses,
      0
    );
    const totalSuccessStatuses = monitor.hours.reduce(
      (partial, cur) => partial + cur.numSuccessStatuses,
      0
    );

    return (totalSuccessStatuses / totalStatuses) * 100;
  };

  return (
    <div data-network-state={networkState()} class="row no-space">
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
              style={{
                margin: "5em auto 10em auto",
                "min-width": "150px",
              }}
            />
          </div>
        </Match>
      </Switch>
      <For each={monitorRecords()}>
        {(monitor) => (
          <div class="col-12 monitor">
            <h3 data-id={monitor.monitorId}>
              <MonitorStatusIcon percentage={getPercentage(monitor)} />
              &nbsp;{monitor.name}
              <small>Availablity: {Math.round(getPercentage(monitor))}%</small>
            </h3>
            <MonitorStatusRow
              record={monitor}
              setModalContent={setModalContent(monitor.monitorId)}
            />
            <hr />
          </div>
        )}
      </For>

      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <MonitorDetailModal
            monitorId={selectedMonitorTickRecord().monitorId}
            percentage={selectedMonitorTickRecord().percentage}
            hour={selectedMonitorTickRecord().hour}
          />
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
