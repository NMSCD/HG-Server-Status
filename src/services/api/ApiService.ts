import {
  MonitorStatusTickViewModel,
  MonitorStatusViewModel,
} from "../../contracts/MonitorStatusViewModel";
import { ResultWithValue } from "../../contracts/results/ResultWithValue";
import { BaseApiService } from "./BaseApiService";

export class ApiService extends BaseApiService {
  async getMonitorRecord(
    startDate: string,
    endDate: string
  ): Promise<ResultWithValue<Array<MonitorStatusViewModel>>> {
    return await this.get<Array<MonitorStatusViewModel>>(
      `MonitorRecord/${startDate}/${endDate}`
    );
  }
  async getMonitorRecordTicks(
    monitorId: number,
    hour: number
  ): Promise<ResultWithValue<Array<MonitorStatusTickViewModel>>> {
    return await this.get<Array<MonitorStatusTickViewModel>>(
      `MonitorRecord/ticks/${monitorId}/${hour}`
    );
  }
}
