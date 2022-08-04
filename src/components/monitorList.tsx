import { Component, createSignal, For, onMount, Show } from 'solid-js';
import { ApiService } from '../services/api/ApiService';
import { NetworkState } from '../constants/enum/NetworkState';
import { MonitorStatusHourViewModel, MonitorStatusViewModel } from '../contracts/MonitorStatusViewModel';
import { MonitorStatusIcon, MonitorStatusRow } from './monitorStatusRow';
import { Button, createDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@hope-ui/solid';
import { anyObject } from '../helper/typescriptHacks';
import { formatDate, hoursToEpoch, monitorHourFormat, monitorTickFormat } from '../helper/dateHelper';

export const MonitorList: Component = () => {
    const { isOpen, onOpen, onClose } = createDisclosure();

    const [networkState, setNetworkState] = createSignal<NetworkState>();
    const [monitorRecords, setMonitorRecords] = createSignal<Array<MonitorStatusViewModel>>();
    const [selectedMonitorRecord, setSelectedMonitorRecord] = createSignal<MonitorStatusHourViewModel>(anyObject);

    onMount(() => {
        fetchData();
    });

    const fetchData = async () => {
        const apiService = new ApiService();
        const today = new Date();
        const endDate = today.toISOString().substring(0, 10);

        today.setDate(today.getDate() - 7)
        const startDate = today.toISOString().substring(0, 10);
        const apiResult = await apiService.getMonitorRecord(startDate, endDate);
        if (apiResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setMonitorRecords(apiResult.value);
        setNetworkState(NetworkState.Success);
    }

    const setModalContent = (monitorRecordPerHour: MonitorStatusHourViewModel) => {
        setSelectedMonitorRecord(monitorRecordPerHour);
        onOpen();
    }

    if (networkState() === NetworkState.Error) {
        return (
            <div class="row">
                <div class="col-12" style={{ 'text-align': 'center' }}>
                    Error
                </div>
            </div>
        );
    }

    if (networkState() === NetworkState.Loading) {
        return (
            <div class="row">
                <div class="col-12" style={{ 'text-align': 'center' }}>
                    Loading
                </div>
            </div>
        );
    }

    return (
        <div class="row no-space">
            <For each={monitorRecords()}>
                {monitor => (
                    <div class="col-12 monitor">
                        <h3 data-id={monitor.monitorId}>
                            <MonitorStatusIcon maxStatus={monitor.status} />
                            {monitor.name}
                        </h3>
                        <MonitorStatusRow
                            record={monitor}
                            setModalContent={setModalContent}
                        />
                        <hr />
                    </div>
                )}
            </For>

            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>
                        <MonitorStatusIcon maxStatus={selectedMonitorRecord().maxStatus} />
                        {monitorHourFormat(hoursToEpoch(selectedMonitorRecord().hourSinceEpochInterval))}
                    </ModalHeader>
                    <ModalBody>
                        <Show when={(selectedMonitorRecord()?.ticks ?? []).length < 1}>
                            <Text textAlign="center" mt="1em">
                                <br />
                                Nothing recorded for this hour
                                <br /><br />
                            </Text>
                        </Show>
                        <Show when={(selectedMonitorRecord()?.ticks ?? []).length > 0}>
                            <Text>Records for this hour:</Text>
                        </Show>
                        <For each={selectedMonitorRecord().ticks}>
                            {record => (
                                <p>
                                    <MonitorStatusIcon maxStatus={record.status} />
                                    {monitorTickFormat(new Date(record.dateRecorded))}
                                </p>
                            )}
                        </For>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};
