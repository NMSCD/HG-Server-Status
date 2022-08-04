import { MonitorStatusViewModel } from '../../contracts/MonitorStatusViewModel';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from './BaseApiService';

export class ApiService extends BaseApiService {

    async getMonitorRecord(startDate: string, endDate: string): Promise<ResultWithValue<Array<MonitorStatusViewModel>>> {
        return await this.get<Array<MonitorStatusViewModel>>(`MonitorRecord/${startDate}/${endDate}`);
    }
}
