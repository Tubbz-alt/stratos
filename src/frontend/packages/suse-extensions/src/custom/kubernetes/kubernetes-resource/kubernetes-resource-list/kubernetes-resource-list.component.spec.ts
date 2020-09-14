import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TabNavService } from '../../../../../../core/tab-nav.service';
import { KubeBaseGuidMock, KubernetesBaseTestModules } from '../../kubernetes.testing.module';
import { KubernetesResourceListComponent } from './kubernetes-resource-list.component';

fdescribe('KubernetesResourceListComponent', () => {
  let component: KubernetesResourceListComponent;
  let fixture: ComponentFixture<KubernetesResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesResourceListComponent ],
      imports: [
        ...KubernetesBaseTestModules,
      ],
      providers: [
        TabNavService,
        KubeBaseGuidMock,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                endpointId: 'anything'
              },
              queryParams: {},
              data: {
                entityCatalogKey: 'pod'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
