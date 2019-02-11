import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Validators } from '@angular/forms';

import { urlValidationExpression } from '../../core/utils.service';
import { EndpointModel } from '../../../../store/src/types/endpoint.types';
import { EndpointTypeConfig, EndpointAuthTypeConfig, EndpointType } from '../../core/extension/extension-types';

import { AppState } from '../../../../store/src/app-state';
import { selectEntities } from '../../../../store/src/selectors/api.selectors';
import { endpointSchemaKey } from '../../../../store/src/helpers/entity-factory';
import { ExtensionService } from '../../core/extension/extension-service';
import { CredentialsAuthFormComponent } from './connect-endpoint-dialog/auth-forms/credentials-auth-form.component';
import { SSOAuthFormComponent } from './connect-endpoint-dialog/auth-forms/sso-auth-form.component';
import { NoneAuthFormComponent } from './connect-endpoint-dialog/auth-forms/none-auth-form.component';

export function getFullEndpointApiUrl(endpoint: EndpointModel) {
  return endpoint && endpoint.api_endpoint ? `${endpoint.api_endpoint.Scheme}://${endpoint.api_endpoint.Host}` : 'Unknown';
}

export function getEndpointUsername(endpoint: EndpointModel) {
  return endpoint && endpoint.user ? endpoint.user.name : '-';
}

export const DEFAULT_ENDPOINT_TYPE = 'cf';

export interface EndpointIcon {
  name: string;
  font: string;
}

const endpointTypes: EndpointTypeConfig[] = [
  {
    value: 'cf',
    label: 'Cloud Foundry',
    urlValidation: urlValidationExpression,
    icon: 'cloud_foundry',
    iconFont: 'stratos-icons',
    homeLink: (guid) => ['/cloud-foundry', guid]
  },
  {
    value: 'metrics',
    label: 'Metrics',
    allowTokenSharing: true,
    homeLink: (guid) => ['/endpoints/metrics', guid]
  },
];

let endpointAuthTypes: EndpointAuthTypeConfig[] = [
  {
    name: 'Username and Password',
    value: 'creds',
    form: {
      username: ['', Validators.required],
      password: ['', Validators.required],
    },
    types: new Array<EndpointType>('cf', 'metrics'),
    component: CredentialsAuthFormComponent
  },
  {
    name: 'Single Sign-On (SSO)',
    value: 'sso',
    form: {},
    types: new Array<EndpointType>('cf'),
    component: SSOAuthFormComponent
  },
  {
    name: 'No Authentication',
    value: 'none',
    form: {},
    types: new Array<EndpointType>('metrics'),
    component: NoneAuthFormComponent
  },
];

const endpointTypesMap = {};

export function initEndpointTypes(epTypes: EndpointTypeConfig[]) {
  epTypes.forEach(epType => {
    endpointTypes.push(epType);

    if (epType.authTypes) {
      // Map in the authentication providers
      epType.authTypes.forEach(authType => {
        const endpointAuthType = endpointAuthTypes.find(a => a.value === authType);
        if (endpointAuthType) {
          endpointAuthType.types.push(endpointAuthType.value as EndpointType);
        }
      });
    }
  });

  endpointTypes.forEach(ept => {
    endpointTypesMap[ept.value] = ept;
  });
}

export function addEndpointAuthTypes(extensions: EndpointAuthTypeConfig[]) {
  endpointAuthTypes.forEach(t => t.formType = t.value);
  endpointAuthTypes = endpointAuthTypes.concat(extensions);
}

// Get the name to display for a given Endpoint type
export function getNameForEndpointType(type: string): string {
  return endpointTypesMap[type] ? endpointTypesMap[type].label : 'Unknown';
}

export function getCanShareTokenForEndpointType(type: string): boolean {
  return endpointTypesMap[type] ? !!endpointTypesMap[type].allowTokenSharing : false;
}

export function getEndpointTypes() {
  return endpointTypes;
}

export function getIconForEndpoint(type: string): EndpointIcon {
  const icon = {
    name: 'settings_ethernet',
    font: ''
  };

  const ep = endpointTypesMap[type];
  if (ep && ep.icon) {
    icon.name = ep.icon;
    icon.font = ep.iconFont;
  }
  return icon;
}

export function endpointHasMetrics(endpointGuid: string, store: Store<AppState>): Observable<boolean> {
  return store.select(selectEntities<EndpointModel>(endpointSchemaKey)).pipe(
    first(),
    map(state => !!state[endpointGuid].metadata && !!state[endpointGuid].metadata.metrics)
  );
}

export function getEndpointAuthTypes() {
  return endpointAuthTypes;
}

export function initEndpointExtensions(extService: ExtensionService) {
  // Register auth types before applying endpoint types
  const endpointExtConfig = extService.getEndpointExtensionConfig();
  addEndpointAuthTypes(endpointExtConfig.authTypes || []);
  initEndpointTypes(endpointExtConfig.endpointTypes || []);
}
