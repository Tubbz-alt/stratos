import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigSelectionComponent } from './kube-config-selection.component';

describe('KubeConfigSelectionComponent', () => {
  let component: KubeConfigSelectionComponent;
  let fixture: ComponentFixture<KubeConfigSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
