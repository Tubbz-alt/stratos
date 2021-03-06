import { ChartVersionAttributes } from './chart-version';
import { Maintainer } from './maintainer';
import { RepoAttributes } from './repo';

export class Chart {
  id: string;
  type: string;
  links: string[];
  attributes: ChartAttributes;
  relationships: ChartRelationships;
  monocularEndpointId?: string;
}


export class ChartAttributes {
  description: string;
  name: string;
  icon: string;
  repo: RepoAttributes;
  home: string;
  sources: string[];
  keywords: string[];
  maintainers: Maintainer[];
}

class ChartRelationships {
  latestChartVersion: ChartVersionRelationship;
}

class ChartVersionRelationship {
  data: ChartVersionAttributes;
  links: {
    self: string,
  };
}
