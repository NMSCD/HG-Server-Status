import type { Component } from 'solid-js';
import { site } from '../../constants/site';
import packageJson from '../../../package.json';

export const Footer: Component = () => {
    return (
        <footer class="footer">
            <div class="container-fluid">
                <ul class="nav">
                    <li class="nav-item">
                        <a href={site.nmscd.website} class="nav-link">NMSCD</a>
                    </li>
                    <li class="nav-item">
                        <a href={site.nmscd.github} class="nav-link">Github Org</a>
                    </li>
                    <li class="nav-item">
                        <a href={site.github} class="nav-link">Source code ({packageJson.version})</a>
                    </li>
                </ul>
                <div class="copyright">
                    <span>© <b>NMSCD-Status</b> made with 💖 by&nbsp;</span>
                    <a href={site.assistantNMS.website} target="_blank">AssistantNMS</a> for the NMSCD.
                </div>
            </div>
        </footer>
    );
}