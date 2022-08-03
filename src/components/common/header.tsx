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
                        <li class="search-bar input-group">
                            <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal"><i class="tim-icons icon-zoom-split"></i>
                                <span class="d-lg-none d-md-block">Search</span>
                            </button>
                        </li>
                        <li class="dropdown nav-item">
                            <a href="javascript:void(0)" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                <div class="notification d-none d-lg-block d-xl-block"></div>
                                <i class="tim-icons icon-sound-wave"></i>
                                <p class="d-lg-none">
                                    Notifications
                                </p>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
                                <li class="nav-link"><a href="#" class="nav-item dropdown-item">Mike John responded to your email</a></li>
                                <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">You have 5 more tasks</a></li>
                                <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Your friend Michael is in town</a></li>
                                <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Another notification</a></li>
                                <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Another one</a></li>
                            </ul>
                        </li>
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
