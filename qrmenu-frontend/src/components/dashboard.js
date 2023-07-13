import { useEffect, useState } from 'react';
//import PieChart from './PieChart';
import order from '../assets/order.png'
import Scan from '../assets/Scan.png'
import menu from '../assets/restaurant.png'
import './dashboard.css'


const Dashboard = () => {



    return (
        <div className='dashboard'>
            <div class="col main pt-5 mt-3">


                <h4>Dashboard</h4>
                <div class="row mb-3">
                    <div class="col-sm-4">
                        <div class="card ">
                            <div class="card-body ">
                                <div class="card3">
                                    <img alt='img' className="dashboard-img" src={order}></img>
                                </div>
                                <h6 class="text-uppercase">Pending order</h6>
                                <h1 class="display-4">0</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card ">
                            <div class="card-body ">
                                <div class="card2">
                                    <img alt='img' className="dashboard-img" src={Scan}></img>
                                </div>
                                <h6 class="text-uppercase">Total Scan</h6>
                                <h1 class="display-4">87</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card ">
                            <div class="card-body ">
                                <div class="card3">
                                    <img alt='img' className="dashboard-img" src={menu}></img>
                                </div>
                                <h6 class="text-uppercase">Menus</h6>
                                <h1 class="display-4">4</h1>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}


export default Dashboard