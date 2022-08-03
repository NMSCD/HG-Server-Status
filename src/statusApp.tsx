import { Box } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { Header } from './components/common/header';
import { Footer } from './components/common/footer';
import { MonitorList } from './components/monitorList';

export const StatusApp: Component = () => {
  return (
    <Box class="wrapper">
      <Box class="main-panel ps ps--active-y">
        <Header />

        <div class="content">
          <div class="row">
            <div class="col-12">
              <div class="card card-chart">
                <div class="card-header ">
                  <div class="row">
                    <div class="col-sm-6 text-left">
                      <h5 class="card-category">HelloGames server status</h5>
                      <h2 class="card-title">Monitors</h2>
                    </div>
                    <div class="col-sm-6">
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <MonitorList />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Box>
    </Box>
  );
};
