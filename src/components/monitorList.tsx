import { Component, createSignal, For, onMount } from 'solid-js';
import { ApiService } from '../services/api/ApiService';
import { NetworkState } from '../constants/enum/NetworkState';
import { MonitorRecordViewModel } from '../contracts/MonitorRecordViewModel';
import { MonitorStatusRow } from './monitorStatusRow';
import { Button, createDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@hope-ui/solid';
import { MonitorRecordPerHour } from '../contracts/data/MonitorRecordPerHour';
import { anyObject } from '../helper/typescriptHacks';
import { hoursToEpoch } from '../helper/dateHelper';

export const MonitorList: Component = () => {
    const { isOpen, onOpen, onClose } = createDisclosure();

    const [networkState, setNetworkState] = createSignal<NetworkState>();
    const [monitorRecords, setMonitorRecords] = createSignal<Array<MonitorRecordViewModel>>();
    const [selectedMonitorRecord, setSelectedMonitorRecord] = createSignal<MonitorRecordPerHour>(anyObject);

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

    const setModalContent = (monitorRecordPerHour: MonitorRecordPerHour) => {
        setSelectedMonitorRecord(monitorRecordPerHour);
        console.log({ ...monitorRecordPerHour })
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
            <div class="col-12"><br /></div>
            <For each={monitorRecords()}>
                {monitor => (
                    <div class="col-12 monitor">
                        <h3>{monitor.name}</h3>
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
                    <ModalHeader>{hoursToEpoch(selectedMonitorRecord().hoursSinceEpochInterval).toISOString()}</ModalHeader>
                    <ModalBody>
                        <h1>hi</h1>
                        <For each={selectedMonitorRecord().records}>
                            {record => (
                                <p>{record.dateRecorded}</p>
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
