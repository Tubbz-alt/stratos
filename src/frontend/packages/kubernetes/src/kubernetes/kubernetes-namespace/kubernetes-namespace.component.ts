import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IHeaderBreadcrumb } from '../../../../core/src/shared/components/page-header/page-header.types';
import { getFavoriteFromEntity } from '../../../../store/src/user-favorite-helpers';
import { UserFavoriteManager } from '../../../../store/src/user-favorite-manager';
import { kubernetesNamespacesEntityType } from '../kubernetes-entity-factory';
import { BaseKubeGuid } from '../kubernetes-page.types';
import { KubernetesEndpointService } from '../services/kubernetes-endpoint.service';
import { KubernetesNamespaceService } from '../services/kubernetes-namespace.service';
import { KubernetesAnalysisService } from '../services/kubernetes.analysis.service';
import { KubernetesService } from '../services/kubernetes.service';
import { IFavoriteMetadata } from './../../../../store/src/types/user-favorites.types';
import { KUBERNETES_ENDPOINT_TYPE } from './../kubernetes-entity-factory';

@Component({
  selector: 'app-kubernetes-namespace',
  templateUrl: './kubernetes-namespace.component.html',
  styleUrls: ['./kubernetes-namespace.component.scss'],
  providers: [
    {
      provide: BaseKubeGuid,
      useFactory: (activatedRoute: ActivatedRoute) => {
        return {
          guid: activatedRoute.snapshot.params.endpointId
        };
      },
      deps: [
        ActivatedRoute
      ]
    },
    KubernetesService,
    KubernetesEndpointService,
    KubernetesNamespaceService,
    KubernetesAnalysisService,
  ]
})
export class KubernetesNamespaceComponent {

  tabLinks = [];

  public breadcrumbs$: Observable<IHeaderBreadcrumb[]>;

  constructor(
    public kubeEndpointService: KubernetesEndpointService,
    public kubeNamespaceService: KubernetesNamespaceService,
    public analysisService: KubernetesAnalysisService,
    private userFavoriteManager: UserFavoriteManager,
  ) {
    this.breadcrumbs$ = kubeEndpointService.endpoint$.pipe(
      map(endpoint => ([{
        breadcrumbs: [
          { value: endpoint.entity.name, routerLink: `/kubernetes/${endpoint.entity.guid}/namespaces` },
        ]
      }])
      )
    );

    this.tabLinks = [
      { link: 'pods', label: 'Pods', icon: 'pod', iconFont: 'stratos-icons' },
      { link: 'services', label: 'Services', icon: 'service', iconFont: 'stratos-icons' },
      { link: 'analysis', label: 'Analysis', icon: 'assignment', hidden$: this.analysisService.hideAnalysis$ },
    ];
  }

  public favorite$ = this.kubeNamespaceService.namespace$.pipe(
    filter(app => !!app),
    map(namespace => getFavoriteFromEntity<IFavoriteMetadata>(
      {
        kubeGuid: this.kubeEndpointService.baseKube.guid,
        ...namespace,
        prettyText: 'Kubernetes Namespace',
      },
      kubernetesNamespacesEntityType,
      this.userFavoriteManager,
      KUBERNETES_ENDPOINT_TYPE
    ))
  );
}
