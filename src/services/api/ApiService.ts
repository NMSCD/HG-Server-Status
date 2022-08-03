import { MonitorRecordViewModel } from '../../contracts/MonitorRecordViewModel';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';

export class ApiService extends BaseApiService {

    async getMonitorRecord(startDate: string, endDate: string): Promise<ResultWithValue<Array<MonitorRecordViewModel>>> {
        return await this.get<Array<MonitorRecordViewModel>>(`MonitorRecord/${startDate}/${endDate}`);
    }
}
