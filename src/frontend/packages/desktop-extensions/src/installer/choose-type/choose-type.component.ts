import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.scss']
})
export class ChooseTypeComponent implements OnInit {

  public types = [{
    title: 'Stratos',
    description: 'Stratos is the gateway interface to your Cloud Foundry and Kubernetes instances. Deploying this to your Kubernetes will unlock it\'s full potential and provide countless hours of efficiency saving, money and trees',
    icon: '/core/assets/logo.png',
    chart: {
      id: 'SUSE/console/3.2.1',
      version: '3.2.1'
    }
  }, {
    title: 'KubeCF',
    description: 'Ever wondered what could be better than Cloud Foundry? Well stop right there, because you`ve just discovered Cloud Foundry on Kubernetes! Install now to get some of that sweet sweet Kubeness with your CF',
    icon: '/core/assets/types/kubecf-small.png',
    chart: {
      id: 'SUSE/kubecf/2.2.2',
      version: '2.2.2'
    }
  }, {
    title: 'Minibroker',
    description: 'There`s always got to be three choices',
    icon: '/core/assets/types/osb_logo.png',
    chart: {
      id: '',
      version: ''
    }
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
