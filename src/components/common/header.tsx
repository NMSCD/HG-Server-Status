import type { Component } from 'solid-js';
import { site } from '../../constants/site';

export const Header: Component = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <a class="navbar-brand" href="javascript:void(0)">Status - NMSCD</a>
                </div>
                <div class="collapse navbar-collapse" id="navigation">
                    <ul class="navbar-nav ml-auto">
                        <li class="dropdown nav-item">
                            <a href={site.nmscd.website} target="_blank" rel="noopener noreferrer" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                <div class="photo">
                                    <img src="/assets/img/nmscd.png" alt="NMSCD" />
                                </div>
                            </a>
                        </li>
                        <li class="separator d-lg-none"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
