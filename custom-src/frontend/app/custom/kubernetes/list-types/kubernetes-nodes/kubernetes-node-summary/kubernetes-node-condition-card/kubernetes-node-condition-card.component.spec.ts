import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  KubernetesActivatedRouteMock,
  KubernetesBaseTestModules,
  KubernetesGuidMock,
} from '../../../../kubernetes.testing.module';
import { KubernetesEndpointService } from '../../../../services/kubernetes-endpoint.service';
import { KubernetesNodeService } from '../../../../services/kubernetes-node.service';
import { KubernetesNodeConditionCardComponent } from './kubernetes-node-condition-card.component';
import { KubernetesNodeConditionComponent } from './kubernetes-node-condition/kubernetes-node-condition.component';

// TODO: RC xdescribed
describe('KubernetesNodeConditionCardComponent', () => {
  let component: KubernetesNodeConditionCardComponent;
  let fixture: ComponentFixture<KubernetesNodeConditionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubernetesNodeConditionCardComponent, KubernetesNodeConditionComponent],
      imports: KubernetesBaseTestModules,
      providers: [
        KubernetesEndpointService,
        KubernetesNodeService,
        KubernetesActivatedRouteMock,
        KubernetesGuidMock]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesNodeConditionCardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
