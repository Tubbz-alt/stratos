import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesBaseTestModules, KubernetesGuidMock } from '../../../kubernetes.testing.module';
import { KubernetesEndpointService } from '../../../services/kubernetes-endpoint.service';
import { NodePodCountComponent } from './node-pod-count.component';

describe('NodePodCountComponent', () => {
  let component: NodePodCountComponent;
  let fixture: ComponentFixture<NodePodCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodePodCountComponent],
      imports: KubernetesBaseTestModules,
      providers: [KubernetesGuidMock, KubernetesEndpointService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePodCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
